import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import "vitest-axe/extend-expect";
import { Alert } from "./Alert";
import userEvent from '@testing-library/user-event'

describe("Alert", () => {
  test('error/warning ont role="alert"', () => {
    render(<Alert variant="error">Erreur !</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("le bouton dismiss appelle onDismiss", async () => {
    const onDismiss = vi.fn();
    render(
      <Alert variant="info" onDismiss={onDismiss}>
        X
      </Alert>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Fermer le message" }),
    );
    expect(onDismiss).toHaveBeenCalledOnce();
  });
  test("le composant n'a aucune violation a11y", async () => {
    const { container } = render(<Alert variant="warning" />);

    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});

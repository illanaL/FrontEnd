import { SignupArtisanFormStepTwoForm } from "../components/SignupArtisanStepTwoForm";

export const MyProfilePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>
      <SignupArtisanFormStepTwoForm isEditMode />
    </div>
  );
};

export default MyProfilePage;
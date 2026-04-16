import type { PropsWithChildren, ReactNode } from "react";

export function Card({ header, children }: PropsWithChildren<{
    header: ReactNode
}>) {



    return (
        <>
            <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm flex flex-col gap-4 items-start">
                <div className="flex items-start gap-4">
                    { header }
                </div>

                {children}
            </div>
            
        </>
    )
}
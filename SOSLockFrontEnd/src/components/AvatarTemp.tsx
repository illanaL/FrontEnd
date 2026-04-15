interface AvatarProps {
    src: string;
    size?: number 
}

export function Avatar ({src, size}:AvatarProps) {
    return (
        <>
        <img 
        src={src}
        alt="avatar"
        width={size}
        height={size}
        className="rounded-full object-cover"
        />
        </>
    )
}
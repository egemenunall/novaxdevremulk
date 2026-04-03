import Image from 'next/image';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({
  className = 'h-16 w-auto',
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/novax-logo.png"
      alt="NOVAX Reklam & danışmanlık"
      width={635}
      height={481}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}

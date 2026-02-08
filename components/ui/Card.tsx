import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
  category?: string;
  date?: string;
}

export default function Card({
  title,
  description,
  image,
  href,
  category,
  date,
}: CardProps) {
  return (
    <Link href={href} className="group block">
      <article className="card h-full">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-softBlack-900 text-xs font-semibold rounded-full">
              {category}
            </span>
          )}
        </div>
        <div className="p-6">
          {date && (
            <time className="text-sm text-softBlack-400 mb-2 block">{date}</time>
          )}
          <h3 className="text-xl font-serif font-semibold text-softBlack-900 mb-2 group-hover:text-gold-600 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-softBlack-500 text-sm line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  href: string;
  badge?: string;
}

export function ProductCard({
  title,
  price,
  image,
  href,
  badge,
}: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="card h-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-beige-100">
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">
              {badge}
            </span>
          )}
          <div className="absolute inset-0 bg-softBlack-900/0 group-hover:bg-softBlack-900/10 transition-colors duration-300" />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-medium text-softBlack-800 mb-1 group-hover:text-gold-600 transition-colors">
            {title}
          </h3>
          <p className="text-gold-600 font-semibold">{price}</p>
        </div>
      </div>
    </Link>
  );
}


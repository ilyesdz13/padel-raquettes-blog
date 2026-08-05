import type { ReactNode } from "react";
import ProductCard from "./ProductCard";
import ComparisonTable from "./ComparisonTable";
import { slugifyHeading } from "@/lib/articles";

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textContent((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function H2({ children, ...props }: { children: ReactNode }) {
  const id = slugifyHeading(textContent(children));
  return (
    <h2 id={id} className="scroll-mt-24" {...props}>
      {children}
    </h2>
  );
}

export const mdxComponents = {
  ProductCard,
  ComparisonTable,
  h2: H2,
};

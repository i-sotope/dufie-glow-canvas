
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, subtitle, children, className = "" }: PageHeaderProps) => {
  return (
    <section className={`py-20 bg-muted/30 ${className}`}>
      <div className="container text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default PageHeader;

// External packages
import { twMerge } from 'tailwind-merge';

export const Layout: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  children,
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={twMerge('container mx-auto px-6 lg:px-12', className)}
  >
    {children}
  </div>
);

export const LayoutRow: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={twMerge('flex flex-wrap', className)}>
    {children}
  </div>
);

export const LayoutColumn: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xl2?: number;
    xsOffset?: number;
    smOffset?: number;
    mdOffset?: number;
    lgOffset?: number;
    xlOffset?: number;
    xl2Offset?: number;
  }
> = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  xl2,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  xl2Offset,
  className,
  children,
}) => (
  <div
    className={twMerge(
      // Size classes
      xs && `w-column-${xs}`,
      sm && `sm:w-column-${sm}`,
      md && `md:w-column-${md}`,
      lg && `lg:w-column-${lg}`,
      xl && `xl:w-column-${xl}`,
      xl2 && `2xl:w-column-${xl2}`,
      // Offset classes
      xsOffset && `offset-${xsOffset}`,
      smOffset && `sm:offset-${smOffset}`,
      mdOffset && `md:offset-${mdOffset}`,
      lgOffset && `lg:offset-${lgOffset}`,
      xlOffset && `xl:offset-${xlOffset}`,
      xl2Offset && `2xl:offset-${xl2Offset}`,
      className
    )}
  >
    {children}
  </div>
);

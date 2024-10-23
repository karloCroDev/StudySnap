// External packages
import { IoIosClose } from 'react-icons/io';

// note: Because of SEO, I am not declaring this as a button, because this closing tag will only be used inside of components

export const CloseButton: React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
  ...rest
}) => (
  <IoIosClose
    {...rest}
    className="right absolute right-6 top-4 h-8 w-8 cursor-pointer"
  />
);

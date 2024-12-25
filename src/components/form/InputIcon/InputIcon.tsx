import { SvgComponent } from '@/components';

interface Props {
  icon?: string | SvgComponent;
}

export function InputIcon({ icon }: Props) {
  if (!icon) return null;

  const isClassName = typeof icon === 'string';

  if (isClassName) {
    return <i className={icon} />;
  }

  const IconAsSvg = icon;

  return (
    <i className="my-project-svg-icon-wrapper">
      <b className="my-project-svg-icon flex justify-content-center align-items-center">
        <IconAsSvg />
      </b>
    </i>
  );
}

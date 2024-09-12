import { components } from 'react-select';

const SelectImageOption = (props: any) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={data.imageUrl} alt={data.label} style={{ width: 30, height: 30, marginRight: 10 }} />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

export default SelectImageOption;

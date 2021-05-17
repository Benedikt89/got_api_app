import * as React from "react";
import {useState} from "react";
import {Button, Input, Select} from "antd";
import {stringifyQuery} from "../../constants/queryHelpers";
import {CloseCircleOutlined} from '@ant-design/icons';

import "./common.css";

interface FiltersBarComponentProps {
  onConfirm: (query: string) => void
}

const genderOptions = [
  {title: 'Male', value: 'male'},
  {title: 'Female', value: 'female'},
  {title: 'Unknown', value: 'unknown'}
];

const FiltersBar: React.FC<FiltersBarComponentProps> = React.memo(({onConfirm}) => {
  const [filter, setFilter] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  return (
    <div className="action-bar">
      <Input
        placeholder={'Culture'}
        className="action-bar-item" value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{width: '12rem', marginRight: '1rem'}}
      />
      <Select allowClear={true} value={gender} style={{width: '12rem'}}
              placeholder={'Gender'}
              className="action-bar-item"
              onChange={(val) => setGender(!val ? '' : val as string)}
      >
        {genderOptions.map(opt => <Select.Option key={opt.value} value={opt.value}>{opt.title}</Select.Option>)}
      </Select>
      <Button className="action-bar-item"
              onClick={() => onConfirm(stringifyQuery({gender, culture: filter}))}
      >
        Apply
      </Button>
      <CloseCircleOutlined className="action-bar-item"  onClick={() => {
        setFilter('');
        setGender('');
        onConfirm('');
      }}/>
    </div>
  )
});

export default FiltersBar;
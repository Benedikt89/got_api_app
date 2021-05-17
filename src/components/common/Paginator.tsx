import * as React from "react";
import {hasOwnProperty} from "../../types/typeHelpers";
import {PaginatorKeys, PaginatorProps} from "../../types/data-types";
import {Button, Select} from "antd";

interface PaginatorComponentProps {
  onClick: (link: string | undefined) => void
  paginate: PaginatorProps | null
  pageSize: string
  setPageSize: (value: string) => void
}

const options = ['10', '25', '50'];
const Paginator: React.FC<PaginatorComponentProps> = React.memo(({onClick, paginate, pageSize, setPageSize}) => {
  const linksArr: PaginatorKeys[] = ['first', 'prev', 'next', 'last'];

  return !paginate ? null : (
    <div style={{margin: '1rem'}}>
      {linksArr.map((key) =>
        <Button
          style={{marginLeft: '0.7rem'}}
          key={key}
          disabled={!paginate[key]}
          onClick={() => onClick(hasOwnProperty(paginate, key) ? paginate[key] as string : undefined)}
        >
          {key}
        </Button>
      )}
      <Select value={pageSize} style={{width: '4rem', marginLeft: '0.7rem'}}
              onChange={(val) => setPageSize(!val ? '10' : val as string)}
      >
        {options.map(opt => <Select.Option key={opt} value={opt}>{opt}</Select.Option>)}
      </Select>
    </div>
  )
});

export default Paginator;
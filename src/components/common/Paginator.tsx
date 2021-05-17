import * as React from "react";
import {hasOwnProperty} from "../../types/typeHelpers";
import {PaginatorKeys, PaginatorProps} from "../../types/data-types";
import {Button} from "antd";

interface PaginatorComponentProps {
  onClick: (link: string | undefined) => void
  paginate: PaginatorProps | null
}

const Paginator: React.FC<PaginatorComponentProps> = React.memo(({onClick, paginate}) => {
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
    </div>
  )
});

export default Paginator;
import * as React from "react";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {selectDataByKey} from "../../redux/data/selectors";
import {selectFetchingByKey} from "../../redux/app/selectors";
import {parseUrl} from "../../constants/api-url";
import {fetchMentionDataItem} from "../../redux/data/actions";
import {hasOwnProperty} from "../../types/typeHelpers";
import {Link} from "react-router-dom";

interface RenderItemTitleProps {
  link: string
}

const RenderItemTitle: React.FC<RenderItemTitleProps> = ({link}) => {
  const {_dataType, id, url} = useMemo(() => parseUrl(link), [link]);
  const {data, loading} = useSelector((state: AppStateType) => ({
    data: selectDataByKey(state, _dataType, id),
    loading: selectFetchingByKey(state, `fetchMentionDataItem=${_dataType + id}`)
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchMentionDataItem({_dataType, id, url}))
    }
  }, []);

  if (!data) {
    return <p>{loading ? '...Loading' : ''}</p>;
  }
  return <p>
    <Link to={`/${_dataType}${id ? '/' + id : ''}`}>
      {hasOwnProperty(data, 'name') ? data.name : '-'}
    </Link>
  </p>
};

export default RenderItemTitle;
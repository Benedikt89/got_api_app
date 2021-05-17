import * as React from "react";
import {useEffect} from "react";
import {DataPayloadType, DataType} from "../../types/data-types";
import {API} from "../../constants/api-url";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {selectDataByKey} from "../../redux/data/selectors";
import {selectFetchingByKey} from "../../redux/app/selectors";
import {fetchMentionDataItem} from "../../redux/data/actions";
import {useParams} from "react-router";
import {Spin} from "antd";
import {hasOwnProperty} from "../../types/typeHelpers";
import RenderItemTitle from "../common/ItemTitle";

interface ComponentProps {
  _dataType: DataType
}

type RendererObj = {
  key: string
  title: string
  renderType: string
}

const getDataKeysToDisplay = (_dataType: DataType): RendererObj[] => {
  switch (_dataType) {
    case "books": return [
      {key: 'country', title: 'country', renderType: 'string'},
      {key: 'numberOfPages', title: 'Number Of Pages', renderType: 'string'},
    ];
    case "characters":
      return [
        {key: 'character', title: 'character', renderType: 'string'},
        {key: 'alive', title: 'alive', renderType: 'string'},
        {key: 'gender', title: 'gender', renderType: 'string'},
        {key: 'culture', title: 'culture', renderType: 'string'},
        {key: 'allegiances', title: 'allegiances', renderType: 'names_array'},
        {key: 'books', title: 'books', renderType: 'names_array'},
      ];
    case "houses": return [
      {key: 'region', title: 'Region', renderType: 'string'},
      {key: 'coatOfArms', title: 'Coat Of Arms', renderType: 'string'},
      {key: 'words', title: 'Words', renderType: 'string'},
      {key: 'titles', title: 'Titles', renderType: 'string_array'},
      {key: 'seats', title: 'Seats', renderType: 'string'},
      {key: 'diedOut', title: 'Died Out', renderType: 'string'},
      {key: 'overlord', title: 'Overlord', renderType: 'name'},
      {key: 'cadetBranches', title: 'Cadet Branches', renderType: 'names_array'},
    ];
  }
};

const getDataValue = (data: DataPayloadType | null, key: string): any => {
  return data && hasOwnProperty(data, key) ? data[key] as any : ''
};

const renderData = (renderType: string, data: DataPayloadType | null, key: string) => {
  switch (renderType) {
    case "string": return (
      getDataValue(data, key)
    );
    case "string_array": {
      let vals = getDataValue(data, key);
      return vals && Array.isArray(vals) ? vals.join(', ') : ''
    }
    case "name": return <RenderItemTitle link={getDataValue(data, key) as string}/>;
    case "names_array": {
      let vals = getDataValue(data, key);
      return (
        <div className="col">
          {vals && Array.isArray(vals) ? vals.map(val => <RenderItemTitle link={val as string}/>) : ''}
        </div>
      );
    }
  }
  return '';
};

const DescriptionPage:React.FC<ComponentProps> = ({_dataType}) => {
  const {id} = useParams<{id: string}>();
  const {data, loading} = useSelector((state: AppStateType) => ({
    data: selectDataByKey(state, _dataType, id),
    loading: selectFetchingByKey(state, `fetchMentionDataItem=${_dataType + id}`)
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchMentionDataItem({_dataType, id, url: `${API[_dataType]}/${id}`}))
    }
  }, []);

  return (
    <div style={{width: '100%', padding: '1rem'}}>
      <Spin spinning={loading}>
        <h1>{data && hasOwnProperty(data, 'name') && data.name}</h1>
        {getDataKeysToDisplay(_dataType).map(obj => {
          return (
            <div key={obj.key} className="row">
              <b className="data-title">{obj.title}:</b>
              {renderData(obj.renderType, data, obj.key)}
            </div>
          );
        })}
      </Spin>
    </div>
  )
};

export default DescriptionPage;
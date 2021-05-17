import * as React from "react";
import {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {DataType} from "../../types/data-types";
import {selectPageData, selectPaginateByKey} from "../../redux/data/selectors";
import {selectTableColumns} from "../../constants/tableColums";
import {fetchDataThunk} from "../../redux/data/actions";
import {selectFetchingByKey} from "../../redux/app/selectors";
import {Spin} from "antd";
import TableRenderer from "./TableRenderer";
import Paginator from "../common/Paginator";
import FiltersBar from "../common/FiltersBar";
import {QueryObject} from "../../types/app-types";

interface ComponentProps {
  _dataType: DataType
}

export const DataTableWrapper: React.FC<ComponentProps> = ({_dataType}) => {
  const {dataArray, loading, paginate, pageSize} = useSelector((state: AppStateType) => ({
    paginate: selectPaginateByKey(state, _dataType),
    dataArray: selectPageData(state, _dataType),
    loading: selectFetchingByKey(state, `fetchAllData=${_dataType}`),
    pageSize: state.data.query.pageSize
  }));

  const columns = useMemo(() => selectTableColumns(_dataType), [_dataType]);

  const dispatch = useDispatch();

  const fetchData = useCallback((url?: string, query?: QueryObject) => {
    dispatch(fetchDataThunk(_dataType, url || '', query || {}));
  }, [_dataType, dispatch]);

  const setPageSizeCallback = useCallback((pageSize: string) => {
    fetchData('', {pageSize});
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{width: '100%', padding: '1rem'}}>
      <h1>{_dataType}</h1>
      <Spin spinning={loading}>
        <FiltersBar onConfirm={(query) => fetchData('', query)} />
        <TableRenderer columns={columns} dataArray={dataArray} />
        <Paginator
          onClick={fetchData}
          paginate={paginate}
          setPageSize={setPageSizeCallback}
          pageSize={pageSize || '10'}
        />
      </Spin>
    </div>
  )
};

export default DataTableWrapper;
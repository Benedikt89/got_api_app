import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, GetStateType} from "../store";
import {dataAPI} from "./api";
import {batch} from "react-redux";
import {fetchHandler} from "../fetchHandler";
import {PersonItemType} from "../../types/data-types";

export const ticketsActionTypes: {
  SET_FETCHED_DATA: "tickets/SET_FETCHED_DATA"
  UPDATE_ITEM_SUCCESS: "tickets/UPDATE_ITEM_SUCCESS"
  DELETE_TICKET_SUCCESS: "tickets/DELETE_TICKET_SUCCESS"
} = {
  SET_FETCHED_DATA: "tickets/SET_FETCHED_DATA",
  UPDATE_ITEM_SUCCESS: "tickets/UPDATE_ITEM_SUCCESS",
  DELETE_TICKET_SUCCESS: "tickets/DELETE_TICKET_SUCCESS"
};

export type I_dataActions = I_setFetchedData | I_updateItemSuccess |
  I_deleteTicketSuccess

//interfaces
interface I_setFetchedData {
  type: typeof ticketsActionTypes.SET_FETCHED_DATA,
  data: Array<PersonItemType>
}
interface I_updateItemSuccess {
  type: typeof ticketsActionTypes.UPDATE_ITEM_SUCCESS,
  data: PersonItemType
}

interface I_deleteTicketSuccess {
  type: typeof ticketsActionTypes.DELETE_TICKET_SUCCESS,
  data: PersonItemType
}

// //Internal ACTIONS CREATORS
//
// export const _updateItemSuccess = (data: DataPayloadType, dataType: DataType): I_updateItemSuccess =>
//   ({type: ticketsActionTypes.UPDATE_ITEM_SUCCESS, data, dataType});
//
// export const _deleteTicketSuccess = (data: I_ticket): I_deleteTicketSuccess =>
//   ({type: ticketsActionTypes.DELETE_TICKET_SUCCESS, data});
//
// export const _setFetchedData = (data: DataPayloadType[], dataType: DataType): I_setFetchedData =>
//   ({type: ticketsActionTypes.SET_FETCHED_DATA, data, dataType});
//
//
//
// /* ====================
//   thunk actions
//  ==================== */

export const fetchData = () =>
  fetchHandler(
    "fetchAllData",
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      //array of data to fetch
      let success = true;
      const res = await dataAPI.getData();
      console.log(res);
      if (success) {
        return true;
      }
  });
//
//
// export const onTicketUpdate = (ticket: I_ticket) =>
//   fetchHandler(
//     `ticket${ticket.id}`,
//     async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
//       //if data comes with newId
//       let isNew = ticket.id === newTicketId;
//       let res;
//       //user data to set who was updating last
//       let userData = selectUserData(getState());
//       if (userData && userData.id) {
//         if (isNew) {
//           res = await ticketsAPI.addTicket({
//             ...ticket,
//             creatorId: userData.id,
//             lastModifiedId: userData.id,
//           });
//         } else {
//           res = await ticketsAPI.updateTicket({...ticket, lastModifiedId: userData.id});
//         }
//         //after response set data to reducer
//         if (res) {
//           if (isNew) {
//             //set new note to list arr
//             let list = selectList(getState(), ticket.listId);
//             let listRes = await ticketsAPI.updateList({...list, order: [res.id, ...list.order]});
//             if (listRes) {
//               dispatch(_updateItemSuccess({...list, order: [res.id, ...list.order]}, "list"));
//             }
//           }
//           dispatch(_updateItemSuccess(res, "ticket"));
//           return true;
//         }
//       }
//     });
//
// export const onUpdateList = (list: I_listType) =>
//   fetchHandler(
//     "updateList",
//     async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
//       const res = await ticketsAPI.updateList(list);
//       if (res) {
//         dispatch(_updateItemSuccess(res, "list"));
//         return true;
//       }
//     });
//
// export const onTicketDelete = (data: I_ticket) =>
//   fetchHandler(
//     `ticket${data.id}`,
//     async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
//       let list = selectList(getState(), data.listId);
//       if (list) {
//         const resFrom = await ticketsAPI.updateList({
//           ...list, order: list.order.filter(id => id !== data.id)
//         });
//         if (resFrom) {
//           dispatch(_updateItemSuccess(resFrom, 'list'));
//         }
//         const res = await ticketsAPI.deleteTicket(data);
//         if (res) {
//           dispatch(_deleteTicketSuccess(data));
//           return true;
//         }
//       }
//     });
//
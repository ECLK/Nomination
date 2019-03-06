import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const PAYMENT_STATUS_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              STATUS = :status
                              WHERE 
                              ID = :paymentId`;

const updatePaymentStatus = (paymentId,status) => {
    const params = { 'status': status, 'paymentId': paymentId};
    return DbConnection()
        .query(PAYMENT_STATUS_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).then((results) => {
                return params;
            }).catch((error) => {
                throw new DBError(error);
            });
};
//updatePaymentNote

const PAYMENT_NOTE_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              NOTE = :note
                              WHERE 
                              ID = :paymentId`;

const updatePaymentNote = (paymentId, note) => {
    const params = { 'note': note, 'paymentId': paymentId };
    return DbConnection()
        .query(PAYMENT_NOTE_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).then((results) => {
                return params;
            }).catch((error) => {
                throw new DBError(error);
            });
};
export default {
    updatePaymentStatus,
    updatePaymentNote,
}

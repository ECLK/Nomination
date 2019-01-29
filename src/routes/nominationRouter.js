import _ from 'lodash';
import { GET, POST, PUT } from 'HttpMethods';
import {createRoutes} from '../middleware/Router';
import { PaymentService, CandidateService,SupportDocService,NominationService } from 'Service';
import {SAVE_PAYMENT_SCHEMA, UPDATE_PAYMENT_SCHEMA, SAVE_SUPPORT_DOC_SCHEMA, UPDATE_SUPPORT_DOC_SCHEMA, SAVE_CANDIDATE_SCHEMA, SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA} from './schema/nominationSchema';
import {HTTP_CODE_404,HTTP_CODE_201,HTTP_CODE_200} from '../routes/constants/HttpCodes';
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

const nominationRouter = createRoutes();

export const initNominationRouter = (app) => {
    nominationRouter(app, [
      {
        method: GET,
        path: '/nominations/:nominationId/candidates',
        schema: {},
        handler: (req, res, next) => {
          return CandidateService.getCandidateListByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
  
        },
      },
      {
        method: POST,
        path: '/nominations/candidates',
        schema: SAVE_CANDIDATE_SCHEMA,
        handler: (req, res, next) => {
          return CandidateService.saveCandidateByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: GET,
        path: '/nominations/:nominationId/candidates/:candidateId',
        schema: {},
        handler: (req, res, next) => {
          return CandidateService.getCandidateByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
  
        },
      },
      //TODO : yujith, this function is not compleate yet
      // {
      //   method: POST,
      //   path: '/nominations/candidates/:candidateId/support-docs',
      //   schema: SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA,
      //   handler: (req, res, next) => {
      //     return CandidateService.saveCandidateSupportDocsByCandidateId(req)
      //     .then((result) => res.status(HTTP_CODE_201).send(result))
      //     .catch(error => next(error));
      //   },
      // },
      {
        method: GET,
        path: '/nominations/:nominationId/payments',
        schema: {},
        handler: (req, res, next) => {
          return PaymentService.getPaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: POST,
        path: '/nominations/payments',
        handler: (req, res, next) => {
          // console.log(req);
          return PaymentService.createPaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: PUT,
        path: '/nominations/:nominationId/payments',
        schema: UPDATE_PAYMENT_SCHEMA,
        handler: (req, res, next) => {
          return PaymentService.updatePaymentByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: GET,
        path: '/nominations/:nominationId/support-docs',
        handler: (req, res, next) => {
          return SupportDocService.getsupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_200).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: POST,
        path: '/nominations/support-docs',
        schema: SAVE_SUPPORT_DOC_SCHEMA,
        handler: (req, res, next) => {
          return SupportDocService.saveSupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: PUT,
        path: '/nominations/:nominationId/support-docs',
        schema: UPDATE_SUPPORT_DOC_SCHEMA,
        handler: (req, res, next) => {
          return SupportDocService.updateSupportDocsByNominationId(req)
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      {
        method: POST,
        path: '/upload',
        handler: (req, res, next) => {
          //const fileName = req.files.file.name
          //console.log('hahahahahahha', fileName)
          console.log("uuuuuuuuuuuuu",req)
          upload.single(req)
          
          .then((result) => res.status(HTTP_CODE_201).send(result))
          .catch(error => next(error));
        },
      },
      // {
      //   method: POST,
      //   path: '/upload',
      //   // schema: SAVE_SUPPORT_DOC_SCHEMA,
      //   handler: (req, res, next) => {
      //     console.log("=====t========",req.acceptedFiles);
      //   let imageFile = req.files.file;
      
      //   imageFile.mv(`../public/${req.body.filename}.jpg`, function(err) {
      //     if (err) {
      //       return res.status(500).send(err);
      //     }
      
      //     res.json({file: `public/${req.body.filename}.jpg`});
      //   });
      //   },
      // },
    ]);
  };

//TODO : yujith- change below codes into new code pattern
// router.get('/', (req, res) => {
//     res.send("Nominations");
// });

// /**
//  * 3rd EC admin get payment details of all nominations 
//  */
// router.get('/payments', (req, res, next) => {
//     return PaymentService.getAllPayments().then((result) => {
//         if (result instanceof Error) {
//             next(result);
//         } else {
//             res.send(result);
//         }
//     });
// });
// /**
//  * 4th EC admin get payment details of selected nomination 
//  */
// router.get('/:nomination_id/payment', (req, res, next) => {
//     return PaymentService.getPaymentByNominationId(req).then((results) => {
//         if (results instanceof Error) {
//             next(results);
//         } else {
//             res.json(!_.isEmpty(results) ? results : []);
//         }
//     });
// });

// /**
//  * 5th EC admin update payment status 
//  * {
//  * payment_status : pending | accept | reject 
//  * }*/
// router.put('/:nomination_id/payment/status', (req, res, next) => {
//     return PaymentService.updatePaymentStatusByNominationId(req).then((result) => {
//         if (result instanceof Error) {
//             next(result);
//         } else {
//             res.send(result);
//         }
//     });
// });

// /**  
//  *  6th to get allowed nomiantion list for division wise  */
// router.get('/list/:election_id/:team_id', (req, res, next) => {
//     return NominationService.getNominationByTeamId(req).then((result) => {
//         if (result instanceof Error) {
//             next(result);
//         } else {
//             res.send(result);
//         }
//     });
// });

// /** 
//  * 7th to get list of candidates details with respect to a nomination */
// router.get('/:nomination_id/candidate', (req, res, next) => {
//     return CandidateService.getCandidateListByNominationId(req).then((results) => {
//         if (results instanceof Error) {
//             next(results);
//         } else {
//             res.json(!_.isEmpty(results) ? results : []);
//         }
//     });
// });

// /** 
//  * 8th to put  added or updated nominated candidate details */
// router.put('/:nomination_id/candidate/add', (req, res, next) => {
//     return CandidateService.updateNominationCandidates(req).then((results) => {
//         if (result instanceof Error) {
//             next(result);
//         } else {
//             res.send(result);
//         }p
//     });
// });

// /**
//  * 11th - adding a new payment relates to particular nomination id 
//  */
// router.post('/:nomination_id/payment/', (req, res, next) => {
//     return PaymentService.createPaymentByNominationId(req).then((results) => {
//         if (results instanceof Error) {
//             next(results);
//         } else {
//             res.json(results);
//         }
//     });
// });

// /**
//  * 12th - update certain payment details for particular nomination id
//  * editable feilds: depositor, deposit_amount, deposite_date, uploaded_file_name
//  */
// router.put('/:nomination_id/payment/update', (req, res, next) => {
//     return PaymentService.updatePaymentByNominationId(req).then((result) => {
//         if (result instanceof Error) {
//             next(result);
//         } else {
//             res.send(result);
//         }
//     });
// });



// module.exports = router;

export const RESET_OFFER = 'RESET_OFFER';
export function resetOffer() {
  return { type: RESET_OFFER };
}

export const CHECK_OFFER_CODE = 'CHECK_OFFER_CODE';
export const VALID_OFFER_CODE = 'VALID_OFFER_CODE';
export const INVALID_OFFER_CODE = 'INVALID_OFFER_CODE';

const VALID_CODE = '37b1f90e03';
export const checkOfferCode = code => (dispatch) => {
  dispatch({ type: CHECK_OFFER_CODE });
  // mock API response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === VALID_CODE) {
        const data = {
          code,
          expiration: null, // never expires
        };
        resolve(data);
      } else {
        reject('The offer code is invalid.');
      }
    }, 3000);
  }).then(
    (data) => {
      dispatch({ type: VALID_OFFER_CODE, payload: data });
    },
    (error) => {
      dispatch({ type: INVALID_OFFER_CODE, payload: error });
    }
  );
};

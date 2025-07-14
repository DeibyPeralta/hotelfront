
// export const environment = {
//     production: false,
//     expirationTime: 60, 
  
//     baseUrl: 'http://localhost:3000' ,  

//   };
export const environment = {
  production: false,
  baseUrl: window.location.origin.replace(':4200', ':3000')
};

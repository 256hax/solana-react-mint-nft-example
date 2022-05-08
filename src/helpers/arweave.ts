/*
  Get Transaction URL via Arweave wallet
  
  Note:
    console.log(arweave.api.config); =>
      host: "www.arweave.run"
      logger: ƒ log()
      logging: false
      port: 443
      protocol: "https"
      timeout: 20000
      [[Prototype]]: Object
*/
export const getTransactionUrl = (arweaveApiConfig: any, id: string) => {
  const url = arweaveApiConfig.protocol + '://' + arweaveApiConfig.host + '/' + id;
  return url;
};

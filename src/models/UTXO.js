import sha256 from 'crypto-js/sha256.js'
export default class UTXO {
  constructor(owner,amount) {
    this.owner=owner
    this.amount=amount
  }
}

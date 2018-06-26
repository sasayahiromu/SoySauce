const checkUnreadIndex = (deals, authUid) => {
  //既読確認
  var unreadIndex = [];
  for (let i = 0; i < deals.length; i++) {
    if (!!deals[i].deal_last_at) {
      if (authUid === deals[i].borrower_uid) {
        if (!deals[i].borrower_last_read_at) { unreadIndex.push(i) }
        else {
          if (deals[i].borrower_last_read_at.getTime() < deals[i].deal_last_at) {
            unreadIndex.push(i)
          }
        }
      }
      if (authUid === deals[i].lender_uid) {
        if (!deals[i].lender_last_read_at) { unreadIndex.push(i) }
        else {
          if (deals[i].lender_last_read_at.getTime() < deals[i].deal_last_at) {
            unreadIndex.push(i)
          }
        }
      }
    }
  }
  return unreadIndex
}

export default checkUnreadIndex;
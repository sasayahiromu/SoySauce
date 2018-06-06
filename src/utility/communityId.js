const communityIdNameList = 
{
  "サンスプリングストーン": "sunspring-stone",
  "グランツ武蔵新城" :"granalt-musashishinjo",
  '石原マンション': "ishihara-manshon",
  'マーライオン': "marLion"
} 

const communityCorrespondingId = (communityName) => {
  communityId = communityIdNameList[communityName];
  if(!communityId) alert('マンション登録エラー');
  return communityId;
}

export default communityCorrespondingId
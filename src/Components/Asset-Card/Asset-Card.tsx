import { useState } from 'react';
import './Asset-Card.scss';

const AssetCard = (props: any) => {
  const asset = props.asset;
  const [imgUrl, setImgUrl] = useState(asset.media[0].gateway);
  const [fallback, setFallback] = useState(false);

  const reloadUrl = () => {
     if(fallback){
        setImgUrl('/img/default.png');
      }else{
        setImgUrl(asset.metadata.image);
        setFallback(true);
      }
  }

  return (
    <>
    <div className="asset-card">
    <img src={imgUrl} onError={(e)=>{reloadUrl()}} className="preview" alt='..'/>
    <label className='name'>{asset.metadata.name}</label>
    </div>
    </>
  )
}

export default AssetCard;
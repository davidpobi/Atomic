import React, { useEffect, useState } from "react";
import "./Collectibles.scss";
import { useMoralis } from "react-moralis";
import { getUserOwnedAssets_Alchemy } from "../../Services/AssetsService";
import { useSelector, useDispatch } from "react-redux";
import { getAssets } from "../../Store/actions";

const Collectibles: React.FC = () => {
  /** Controller */

  const { isAuthenticated, user } = useMoralis();
  const [userAddress, setUserAddress] = useState("");
  const [startToken, setStartToken] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const collectibles: Array<any> = useSelector((state: any) => state.collectibles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setUserAddress(user?.get("ethAddress"));
  }, []);

  useEffect(() => {
    console.log(userAddress);
    if (userAddress) {
      getUserAssets();
    }
  }, [userAddress]);

  const getUserAssets = async () => {
    if (!hasNextPage) {
      console.log("done fetching");
      return;
    }

    const result = await getUserOwnedAssets_Alchemy("eth", userAddress, startToken);
    console.log(result.assets);
    if (result.assets.length > 0) {
      dispatch(getAssets(result.assets));
    }
    if (!result.nextToken) {
      setHasNextPage(false);
      return;
    }

    setStartToken(result.nextToken);
  };

  /** View */
  return (
    <>
      <div className="page-header">
        <h1 className="heading">NFTs</h1>
        <button onClick={() => getUserAssets()} className="btn btn-md btn-primary getCollectibles">
          Fetch NFTs
        </button>
      </div>

      <div className="assets-list">
        <ul className="list-inline">
          {collectibles.map((asset) => {
            return (
              <li className="list-inline-item center" key={asset.id.tokenId}>
                <div className="asset-card">
                  {asset.metadata.image_url ? (
                    <img src={asset.metadata.image_url} className="preview" alt=".." />
                  ) : (
                    <img src={asset.media[0].gateway} className="preview" alt=".." />
                  )}
                  <label className="name center">{asset.metadata.name}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Collectibles;

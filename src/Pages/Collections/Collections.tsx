import React, { useEffect, useState } from "react";
import "./Collections.scss";
import { getContractMetadata, getNFtsByContract_Alchemy, presentToast } from "../../Services/AssetsService";
import { useSelector, useDispatch } from "react-redux";
import { getCollection } from "../../Store/actions";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IContract } from "../../Models/interfaces";
import AssetCard from "../../Components/Asset-Card/Asset-Card";

const Collections: React.FC = () => {
  /** Contract Metadata */
  const [contractData, setContractData] = useState<IContract>({ name: "", symbol: "", tokenType: "", totalSupply: 0 });
  const [isContractReady, setIsContractReady] = useState<boolean>(true);
  const [isShowTokenType, setIsShowTokenType] = useState(true);

  const [startToken, setStartToken] = useState("");
  const [currentTokenPos, setCurrentTokenPos] = useState(0);
  const [pageTokens, setPageTokens] = useState([""]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalNftsCount, setTotalNftsCount] = useState(0);
  const collection: Array<any> = useSelector((state: any) => state.collections);
  const dispatch = useDispatch();
  const { contractId } = useParams();

  /** Search */
  const [isShowSearchBar, setShowSearchBar] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  useEffect(() => {
    if (contractId && validateEthereumAddress(contractId)) {
      getContractMetadata_(contractId.trim());
      getNFTsByContract(contractId.trim(), startToken, true);
    } else {
      setIsContractReady(false);
      presentToast_(
        "invalidAddress-toast",
        "Invalid Contract Address !!",
        3000,
        toast.POSITION.BOTTOM_CENTER,
        "toast-red"
      );
    }
  }, [contractId]);

  const getContractMetadata_ = async (contractAddress: string) => {
    const data: any = await getContractMetadata(contractAddress);
    if (data === null) {
      setIsContractReady(false);
      presentToast_(
        "invalidAddress-toast",
        "Invalid Contract Address !!",
        3000,
        toast.POSITION.BOTTOM_CENTER,
        "toast-red"
      );
      return;
    }

    console.log(data.contractMetadata);
    setIsContractReady(true);
    setContractData(data.contractMetadata);
  };

  const getNFTsByContract = async (contractAddress: string, pageToken: string, setNext: boolean) => {
    const result = await getNFtsByContract_Alchemy("eth", contractAddress, pageToken);

    if (result.assets.length > 0) {
      dispatch(getCollection(result.assets));
    }

    if (!result.nextToken) {
      setHasNextPage(false);
      return;
    }

    if (setNext) {
      setStartToken(result.nextToken);
      const updateNftsCount = totalNftsCount + result.assets.length;
      setTotalNftsCount(updateNftsCount);
    }
  };

  const pageNext = () => {
    if (!hasNextPage) {
      presentToast_("end-toast", "End of collection !", 1000, toast.POSITION.BOTTOM_RIGHT);
      return;
    }

    getNFTsByContract(contractId || "", startToken, true);
    setPageTokens((oldArray) => [...oldArray, startToken]);
    setCurrentTokenPos(currentTokenPos + 1);
  };

  const pageBack = () => {
    const offset = pageTokens[currentTokenPos - 1];
    setCurrentTokenPos(currentTokenPos - 1);
    if (currentTokenPos === 0) {
      setCurrentTokenPos(0);
      presentToast_("start-toast", "Start of collection !", 1000, toast.POSITION.BOTTOM_RIGHT);
      return;
    }

    setStartToken(pageTokens[pageTokens.length - 1]);
    const set = pageTokens;
    set.pop();
    setPageTokens(set);

    if (offset === undefined) {
      getNFTsByContract(contractId || "", "", false);
    } else {
      getNFTsByContract(contractId || "", offset, false);
    }

    const updateNftsCount = totalNftsCount - 5;
    setTotalNftsCount(updateNftsCount);
  };

  const validateEthereumAddress = (address: string) => {
    const txt_1 = address.slice(0, 2);
    const txt_2 = address.slice(2, address.length);
    if (txt_1 !== "0x") {
      return false;
    }

    if (txt_1 === "0x" && txt_2.length > 5) {
      return true;
    }
  };

  const presentToast_ = (customId: string, message: string, duration: number, position: any, toastClass?: string) => {
    presentToast(customId, message, duration, position, toastClass);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!isShowSearchBar);
  };

  const getNewCollection = () => {
    if (!validateEthereumAddress(addressInput || "")) {
      presentToast_(
        "invalidAddress-toast",
        "Invalid Contract Address !!",
        1000,
        toast.POSITION.BOTTOM_CENTER,
        "toast-red"
      );
      setAddressInput("");
      return;
    }
    window.open(window.location.origin + "/collection/" + addressInput, "_self");
  };

  const checkAddress = (address: any) => {
    setAddressInput(address.trim());
  };

  /** View */
  return (
    <>
      <ToastContainer />
      {isContractReady && (
        <div>
          <div className="page-header">
            <h1 className="heading">
              {contractData.name ? (
                <span className="name">
                  {" "}
                  {contractData.name.length > 25 ? contractData.name.slice(0, 25) + "..." : contractData.name}
                </span>
              ) : (
                <span className="name_address" hidden={collection.length === 0}>
                  <a href={"https://etherscan.io/address/" + contractId} target="_blank" rel="noreferrer">
                    {contractId?.slice(0, 12)}
                    <span className="material-icons">open_in_new</span>
                  </a>
                </span>
              )}

              <span
                onClick={() => setIsShowTokenType(!isShowTokenType)}
                className="btn badge badge-pill badge-primary symbol"
              >
                {contractData.symbol}
              </span>

              <span hidden={!isShowTokenType} className="btn badge badge-pill badge-primary token-type">
                {contractData.tokenType.toUpperCase()}
              </span>
            </h1>
            {isShowSearchBar ? (
              <div style={{ width: "100%" }}>
                <input
                  value={addressInput}
                  onChange={(e) => checkAddress(e.target.value)}
                  onKeyPress={(e) => (e.key === "Enter" ? getNewCollection() : null)}
                  type="input"
                  placeholder="enter contract address... 0x320b3cc84afef86d7"
                  className="address_input"
                />
                <button
                  onClick={() => getNewCollection()}
                  disabled={addressInput.length < 4}
                  className={`getBtn ${addressInput.length > 5 ? "fetch" : ""}`}
                >
                  <span className="material-icons center icon">rocket</span>
                </button>
              </div>
            ) : (
              <span></span>
            )}

            {addressInput.length > 2 ? (
              <button onClick={() => getNewCollection()} className="btn btn-md btn-primary getCollectibles fetch">
                <span className="material-icons icon">rocket</span>
                <span className="txt">Get Collection</span>
              </button>
            ) : (
              <button onClick={() => toggleSearchBar()} className="btn btn-md btn-primary getCollectibles">
                <span className="material-icons icon">loop</span>
                <span className="txt">New Collection</span>
              </button>
            )}
          </div>

          <div className="assets-list">
            <ul className="list-inline">
              {collection.map((asset, index: number) => {
                return (
                  <li
                    className={`list-inline-item center ${index === collection.length - 1 ? "last-item" : ""}`}
                    key={asset.id.tokenId}
                  >
                    <AssetCard asset={asset} />
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="actionsList">
            <li>
              <button
                onClick={() => toggleSearchBar()}
                disabled={!isContractReady}
                className="actionBtn getCollectibles_mobile"
              >
                <span className="material-icons icon center">loop</span>
              </button>
            </li>

            <li>
              <button onClick={() => pageNext()} disabled={!isContractReady} className="actionBtn">
                <span className="material-icons icon center">arrow_forward</span>
              </button>
            </li>

            <li>
              <button onClick={() => pageBack()} disabled={!isContractReady} className="actionBtn">
                <span className="material-icons icon center">arrow_back</span>
              </button>
            </li>

            <li hidden={contractData.totalSupply === undefined || !hasNextPage}>
              <button className="actionBtn pager">
                {totalNftsCount} / {contractData.totalSupply}
              </button>
            </li>
          </ul>
        </div>
      )}

      {!isContractReady && (
        <div className="invalidContract">
          <label className="msg center">Invalid Contract Address. Try Again</label>
          <br />
          <label className="msg center">
            <input
              value={addressInput}
              onChange={(e) => checkAddress(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? getNewCollection() : null)}
              type="input"
              placeholder="enter contract address... 0x320b3cc84afef"
              className="newAddressInput"
            />

            <button
              onClick={() => getNewCollection()}
              disabled={addressInput.length < 4}
              className={`loadAgainBtn ${addressInput.length > 5 ? "fetch" : ""}`}
            >
              <span className="material-icons center icon">rocket</span>
            </button>
          </label>
        </div>
      )}
    </>
  );
};

export default Collections;

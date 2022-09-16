import type { NextPage } from "next";
import PageBody from "../../components/PageBody";
import HeadTag from "../../components/HeadTag";
import { Box, Grid } from "@mui/material";
import AssetCard from "../../components/AssetCard";
import { IAsset } from "../../interfaces/assets";
import { IContract, IContractDetailsResult } from "../../interfaces/contracts";
import React, { useEffect, useRef, useState } from "react";
import ContractToolbar from "../../components/ContractToolbar";
import SearchBox from "../../components/Searchbox";
import ActionButtons from "../../components/ActionButtons";
import { getContractMetadata, getTokensByContract } from "../../services/contracts.service";
import { useRouter } from "next/router";
import { validateEthereumAddress } from "../../utils/helpers";
import Toast from "../../components/Toast";

const tempContractData: IContract = {
  name: "",
  symbol: "",
  tokenType: "",
  totalSupply: 0,
};
const assets: Array<IAsset> = [
  {
    id: "1",
    imgUrl: "https://arweave.net/74oKHasIXsor5bEC6jdv25TMn8rGZLWBFiCwUFBNYdM",
    name: "Ride",
  },
  {
    id: "2",
    imgUrl: "https://arweave.net/OtYO-voyGNKzdgBblAP-C7M8YK1Bbe01upmXrF0X_3U",
    name: "Now O'Clock ⏰",
  },
  {
    id: "3",
    imgUrl: "https://arweave.net/6UP14Y9wcpZ7uvp5N2dzArKw5aPr3E0zqJisW7VM1YY",
    name: "Microcosm",
  },
  {
    id: "4",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/kalabash-22f11.appspot.com/o/DSGNs%2FWings.PNG?alt=media&token=7d8cd6cf-94b1-43e1-85cb-1c95ef80ce6e",
    name: "Wings",
  },
  {
    id: "5",
    imgUrl: "https://arweave.net/OtYO-voyGNKzdgBblAP-C7M8YK1Bbe01upmXrF0X_3U",
    name: "Now O'Clock ⏰",
  },
  {
    id: "6",
    imgUrl: "https://arweave.net/6UP14Y9wcpZ7uvp5N2dzArKw5aPr3E0zqJisW7VM1YY",
    name: "Microcosm",
  },
  {
    id: "7",
    imgUrl: "https://arweave.net/yRiKSLkWGt0mCueowzqbbTzRmct56ZO6ihyqbKuCUhc",
    name: "Wright",
  },
];

const Collections: NextPage = ({ data }: any) => {
  const [assetsList, setAssetsList] = useState<Array<IAsset | any>>([]);
  const [showToggleSearchBox, setShowToggleSearchBox] = useState(false);
  const [isSearchReady, setIsSearchReady] = useState(false);
  const [callSearch, setCallSearch] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [currentTokenPos, setCurrentTokenPos] = useState(0);
  const [pageTokens, setPageTokens] = useState([""]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalTokensCount, setTotalTokensCount] = useState(0);
  const router = useRouter();
  const { contractId } = router.query as any;
  const anchorRef = useRef(null);
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (data.isValid && data.assets.length > 0) {
      setAssetsList(data.assets);
      setTotalTokensCount(data.assets.length);
      if (data.nextToken === null) {
        setHasNextPage(false);
        return;
      }
      setNextToken(data.nextToken);
    }
  }, [contractId, data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpenToast(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [openToast]);

  const getNFTsByContract = async (contractAddress: string, pageToken: string, setNext: boolean) => {
    const result = await getTokensByContract("eth", contractAddress, pageToken);
    if (result.assets.length > 0) {
      setAssetsList(result.assets);
    }

    if (!result.nextToken) {
      setHasNextPage(false);
      return;
    }

    if (setNext) {
      setNextToken(result.nextToken);
      setTotalTokensCount(totalTokensCount + result.assets.length);
    }
  };

  const handleToggleSearchBox = () => {
    setShowToggleSearchBox(!showToggleSearchBox);
    setScrollToTop(!scrollToTop);
  };

  const handleNextPage = () => {
    if (!hasNextPage) {
      presentToast("End of collection");
      return;
    }

    getNFTsByContract(contractId, nextToken, true);
    setPageTokens((oldArray) => [...oldArray, nextToken]);
    setCurrentTokenPos(currentTokenPos + 1);
  };

  const handlePrevPage = () => {
    const offset = pageTokens[currentTokenPos - 1];
    setCurrentTokenPos(currentTokenPos - 1);
    if (currentTokenPos === 0) {
      presentToast("start of collection");
      setCurrentTokenPos(0);
      return;
    }

    setNextToken(pageTokens[pageTokens.length - 1]);
    const set = pageTokens;
    set.pop();
    setPageTokens(set);

    if (offset === undefined) {
      getNFTsByContract(contractId, "", false);
    } else {
      getNFTsByContract(contractId, offset, false);
    }
    setTotalTokensCount(totalTokensCount - 5);
  };

  const invalidContractCallback = () => {
    presentToast("Invalid Contract Address !!");
  };

  const searchReadyCallback = () => {
    setIsSearchReady(true);
  };

  const cancelSearchReadyCallback = () => {
    setIsSearchReady(false);
  };

  const getNewCollection = () => {
    setCallSearch(true);
  };

  const presentToast = (message: string) => {
    setToastMessage(message);
    setOpenToast(true);
  };

  return (
    <React.Fragment>
      <HeadTag
        title="Atomic"
        content={
          data.isSeoReady
            ? "Explore the " + data.metadata.name + " collection"
            : "Explore Collections On The Ethereum Blockchain"
        }
        seo={{
          title: data.isSeoReady ? data.metadata.name : "",
          content: data.isSeoReady ? "Explore the " + data.metadata.name + " collection" : "",
          image: data.isSeoReady && data.assets.length > 0 ? data.assets[0].media[0].gateway : "",
        }}
        faviconUrl="/favicon.png"
      />

      <PageBody scrollPage={scrollToTop}>
        <ContractToolbar
          searchReady={isSearchReady}
          runSearchCallback={getNewCollection}
          contract={data.isValid ? data.metadata : tempContractData}
          toggleSearchBoxCallback={handleToggleSearchBox}
        />

        {showToggleSearchBox ? (
          <SearchBox
            callSearch={callSearch}
            invalidContractCallback={invalidContractCallback}
            searchReadyCallback={searchReadyCallback}
            cancelSearchReadyCallback={cancelSearchReadyCallback}
          />
        ) : (
          <></>
        )}

        <Grid
          container
          rowSpacing={{
            xs: 3,
            sm: 2,
            md: 3,
            xl: 4,
          }}
          columnSpacing={{
            sm: 3,
            md: 4,
            xl: assets.length > 6 ? 7 : 5,
          }}
          sx={{
            position: "relative",
            top: "20px",
          }}
        >
          {assetsList.map((asset, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              xl={4}
              key={asset.id.tokenId}
              sx={{
                backgroundColor: "white",
                marginBottom: {
                  xs: index === assets.length - 1 ? "50px" : "20px",
                  md: "0px",
                },
              }}
            >
              <AssetCard assetData={asset} />
            </Grid>
          ))}
        </Grid>

        <ActionButtons
          pager={{ totalTokensCount: totalTokensCount, totalSupply: data.metadata.totalSupply }}
          nextPageCallback={handleNextPage}
          previousPageCallback={handlePrevPage}
          toggleSearchBoxCallback={handleToggleSearchBox}
        />
      </PageBody>
      <Box ref={anchorRef} component={"div"} sx={{ height: "30px" }}>
        <Toast
          openState={openToast}
          message={toastMessage}
          hasIcon={false}
          anchorRef={anchorRef}
          placement="auto"
          positionTop={{
            xs: "85vh",
            sm: "82vh",
            md: "85vh",
            lg: "80vh",
            xl: "80vh",
          }}
          positionLeft={{
            xs: "-10px",
            sm: "-10px",
            md: "10px",
            xl: "10px",
          }}
        />
      </Box>
    </React.Fragment>
  );
};

// This gets called on every request
export const getServerSideProps = async ({ params }: any) => {
  const contractId = params.contractId;
  let data: IContractDetailsResult = {
    isValid: false,
    metadata: {},
    assets: [],
    nextToken: null,
    isSeoReady: false,
  };

  const getContractMetadata_ = async (contractAddress: string) => {
    const result: any = await getContractMetadata(contractAddress);
    if (result === null) {
      data.isValid = false;
      return;
    }
    data.isValid = true;
    data.metadata = result.contractMetadata;
    data.metadata.address = contractId;
  };

  const getTokensByContract_ = async (contractAddress: string, pageToken: string) => {
    const result = await getTokensByContract("eth", contractAddress, pageToken);

    if (result.assets.length > 0) {
      data.assets = result.assets;
      data.nextToken = result.nextToken || null;
    } else {
      data.assets = [];
      data.nextToken = null;
    }
  };

  if (contractId && validateEthereumAddress(contractId)) {
    await getContractMetadata_(contractId.trim());
    if (data.isValid) {
      await getTokensByContract_(contractId.trim(), "");
    }
  }

  if (data.isValid && data.metadata.name !== undefined) {
    data.isSeoReady = true;
  }

  return { props: { data } };
};

export default Collections;

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IAsset } from "../../interfaces/assets";
import defaultThumbnail from "/public/images/default.png";

const card = {
  display: "inline-block",
  position: "relative",
  left: {
    xs: "1%",
    sm: "0%",
    md: "0%",
  },
  width: {
    xs: "98%",
    sm: "100%",
    md: "100%",
  },
  ".preview": {
    position: "relative",
    borderRadius: "15px",
  },
};

const name = {
  position: "relative",
  top: {
    xs: "5px",
    sm: "5px",
    md: "5px",
  },
  fontSize: {
    xs: "19px",
    sm: "22px",
    md: "22px",
  },
  fontWeight: 400,
  fontFamily: "Kantumruy Pro",
  color: "rgb(109, 108, 108)",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  width: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
};

interface AssetCardProps {
  assetData: IAsset | any;
}

const AssetCard = ({ assetData }: AssetCardProps) => {
  const [asset, setAsset] = useState<IAsset | any>({
    name: assetData.metadata.name,
    imgUrl: assetData.media[0].gateway,
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    setAsset({ name: assetData.metadata.name, imgUrl: assetData.media[0].gateway });
  }, [assetData]);

  const sanitizeAndSetUrl = (assetUrl: string) => {
    const image_url: any = assetUrl;
    const hold = image_url.match("ipfs://");
    if (hold === null) {
      setAsset({ ...asset, imgUrl: assetData.media[0].gateway });
      return;
    }
    if (hold[0] === "ipfs://") {
      let image_location: string | null = null;
      const txt_ = image_url.split("ipfs://")[1];
      const isClean = txt_.match("ipfs/");
      if (isClean !== null) {
        image_location = txt_.split("ipfs/")[1];
      } else {
        image_location = txt_;
      }

      const url = "https://ipfs.io/ipfs/" + image_location;
      setAsset({ ...asset, imgUrl: url });
    } else {
      setAsset({ ...asset, imgUrl: assetData.media[0].raw });
    }
  };

  const reloadUrl = () => {
    try {
      if (fallback) {
        setAsset({ ...asset, imgUrl: defaultThumbnail });
      } else {
        if (assetData.metadata !== undefined) {
          setAsset({ ...asset, imgUrl: assetData.metadata.image });
        } else if (assetData.media) {
          sanitizeAndSetUrl(assetData.media[0].raw);
        }
        setFallback(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ ...card }}>
        <Image
          src={asset.imgUrl}
          alt="token"
          width={"500"}
          height={"500"}
          layout="responsive"
          objectFit="contain"
          className="preview"
          quality={100}
          placeholder={"blur"}
          blurDataURL={
            "https://firebasestorage.googleapis.com/v0/b/kalabash-22f11.appspot.com/o/GalleryX%2FImages%2Floader%20light.png?alt=media&token=2933d69a-608a-46e6-8caf-162ef4031b1a"
          }
          objectPosition={"center"}
          onError={reloadUrl}
        />

        {asset.name?.length && asset.name?.length > 0 ? (
          <Typography sx={{ ...name }}>
            {asset.name?.length && asset.name?.length > 25 ? asset.name?.slice(0, 25) + "..." : asset.name}
          </Typography>
        ) : (
          <Typography sx={{ ...name, color: "transparent" }}>..</Typography>
        )}
      </Box>
    </React.Fragment>
  );
};

export default AssetCard;

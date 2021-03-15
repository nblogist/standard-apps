import { classes } from "@canvas-ui/react-util";
import React from "react";
import styled from "styled-components";
import { BareProps } from "@canvas-ui/react-components/types";
import { Sparklines, SparklinesLine } from "react-sparklines";
import CryptoCardPlaceholder from "./CryptoCardPlaceholder";
import { Segment, Loader } from "semantic-ui-react";

interface Props extends BareProps {
  abbr: string;
  image: string;
  value: string;
  circulatingSupply: string;
  marketCap: string;
  high: string;
  loading: boolean;
  name: string;
  priceChange: string;
  prices: Array<string>;
}

function CryptoCard({
  className,
  name = "",
  value = "",
  image = "",
  abbr = "",
  circulatingSupply,
  marketCap,
  high,
  loading = false,
  priceChange = "",
  prices = []
}: Props): React.ReactElement<Props> {
  const formatPrice = (val: string, cutoff = true) => {
    const _val = val.split(".");
    if (_val[0].startsWith("-")) {
      _val[0] = `-$${_val[0].substring(1)}`;
      return _val[0] + "." + _val[1].substr(0, cutoff ? 2 : undefined);
    }
    return "$" + _val[0] + "." + _val[1].substr(0, cutoff ? 2 : undefined);
  };

  // useMemo
  const renderPriceChange = () => {
    const _priceChange = parseFloat(priceChange);
    return (
      <div
        className={classes(
          "crypto-change",
          `${_priceChange > 0 ? "crypto-change-up" : _priceChange == 0 ? "crypto-change-normal" : "crypto-change-down"}`
        )}
      >
        {formatPrice(priceChange, false)}
      </div>
    );
  };

  const renderPriceChart = () => {
    const _priceChange = parseFloat(priceChange);

    return (
      <div className="crypto-chart">
        <Sparklines data={prices.length > 0 ? prices : ["0", "0", "0", "0", "0"]}>
          <SparklinesLine
            className="crypto-sparkline"
            color={_priceChange > 0 ? "#6FCF97" : _priceChange == 0 ? "#bab8c0" : "#EB5757"}
          />
        </Sparklines>
      </div>
    );
    return (
      <Segment className="crypto-card-chart-segment">
        <Loader size="small" />
      </Segment>
    );
  };

  return (
    <div className={classes(className, "crypto-card--Wrapper")}>
      {loading ? (
        <CryptoCardPlaceholder />
      ) : (
        <>
          <div className="crypto-image-container">
            <div className="crypto-image-bg" />
            <div className="crypto-image-bg2" />
            <div className="crypto-image" style={{ background: `url(${image})` }} />
          </div>
          <h1 className="crypto-name">
            {name} - {abbr}
          </h1>
          <div className="crypto-value">{formatPrice(value)}</div>
          <div className="crypto-price-info">
            {renderPriceChange()}
            {renderPriceChart()}
          </div>
          {/*<div className="crypto-extra-info">
            <div className="crypto-info-header">Circ. Supply</div>
            <div className="crypto-info-text">{circulatingSupply || "N/A"}</div>
            <div className="crypto-info-header">Market Cap</div>
            <div className="crypto-info-text">{marketCap || "N/A"}</div>
            <div className="crypto-info-header">High</div>
            <div className="crypto-info-text">{high || "N/A"}</div>
            </div>*/}
        </>
      )}
    </div>
  );
}

export default React.memo(styled(CryptoCard)`
  min-height: 256px;
  padding: 24px;
  min-width: 248px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.theme.glassmorphismCard}

  .crypto-price-info {
    text-align: center;
  }

  .crypto-chart {
    width: 100px;
    height: 20px;
    margin-top: 16px;
  }

  .crypto-name {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: ${props => props.theme.textlight};
  }

  .crypto-value {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: ${props => props.theme.text};
    margin: 12px 0;
  }

  .crypto-image-container {
    position: relative;
  }

  .crypto-image-bg {
    width: 70px;
    height: 70px;
    background: #ffffff;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
  }

  .crypto-image-bg2 {
    position: absolute;
    width: 76.6px;
    height: 75.77px;
    top: 0.58px;
    left: 2.56px;
    z-index: -1;
    background: linear-gradient(
      195.55deg,
      #8c8c8c 7.56%,
      #8c8c8c 26.23%,
      #ffffff 44.94%,
      #8c8c8c 61.77%,
      #929292 91.54%
    );
    transform: matrix(1, -0.1, 0, 0.99, 0, 0);
    border-radius: 50%;
    filter: drop-shadow(5px 12px 24px rgba(255, 255, 255, 0.25));
  }

  .crypto-image {
    position: absolute;
    width: 70px;
    height: 70px;
    background-repeat: no-repeat !important;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
    background-size: contain !important;
    background-position: center !important;
    top: 0;
    left: 0;
  }

  .crypto-card-container {
    min-height: 256px;
    padding: 24px;
    min-width: 248px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .crypto-info-header {
    color: ${props => props.theme.textlight};
  }

  .crypto-info-text {
    color: ${props => props.theme.textlight};
    margin-bottom: 6px;
  }

  .crypto-name-container {
    display: flex;

    img {
      width: 25px;
      height: 25px;
    }

    h1 {
      margin: 0;
    }
  }

  .crypto-change-up {
    color: ${props => props.theme.green} !important;
  }

  .crypto-change {
    color: ${props => props.theme.text};
  }

  .crypto-change-down {
    color: ${props => props.theme.red} !important;
  }

  crypto-sparkline {
    fill: #000 !important ;
  }

  .ui.loader {
    display: block;
  }

  .ui.loader:before {
    // border: ${props => props.theme.backgroundlight};
  }

  .ui.loader:after{
    border-color ${props => props.theme.highlight} transparent transparent;
  }

  .crypto-card-chart-segment {
    border: 0;
    box-shadow:none;
  }
`);

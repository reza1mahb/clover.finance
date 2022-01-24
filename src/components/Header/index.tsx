import React, { ReactElement, useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { WrapperDesktopOnly, WrapperMobileOnly } from '../../CloverLibrary';
import { breakpoint } from "../../mixins/breakpoint";
import { t } from '../../i18n/intl';
import { Locale, setLocale } from '../../i18n/i18nSlice';
import { useLocale } from '../../i18n/useLocale';
import store from '../../../src/state';
import { Socials } from '../../Socials';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 88px;
  background: ${(props) => props.theme.colors.NEUTRAL};
  ${breakpoint(css`
    height: 70px;
  `)};
`;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 128px;
  margin: 0 auto;
  max-width: 1440px;
  min-width: 1000px;
  ${breakpoint(css`
    min-width: initial;
    padding: 25px;
  `)};
`;

const HeaderIcon = styled.img`
  width: 20px;
`

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  ${breakpoint(css`
    //width: 100%;
    //justify-content: center;
  `)};
  img {
    width: 128px;
    object-fit: contain;
    flex: 1 1 0%;
    ${breakpoint(css`
      height: 24px;
    `)};
  }

  .nav-bar {
    margin-top: -3px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const Link = styled(NavLink)`
  margin-right: 32px;
  color: ${(props) => props.theme.colors.BACKGROUND};
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }

  &.active {
    position: relative;
    &::after {
      content: " ";
      display: flex;
      width: 100%;
      height: 3px;
      background: ${(props) => props.theme.colors.BAR};
      position: absolute;
      bottom: -10px;
      right: 0;
    }
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 24px;
    margin: 0 12px;
    cursor: pointer;
  }
`

const WebWallet = styled.div`
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.BACKGROUND};
  padding: 6px 16px;
  margin: 0 40px;
  cursor: pointer;
`

const Language = styled.div`
  position: relative;
  & > img {
    width: 28px;
    cursor: pointer;
  }
`

const LanguageList = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  color: ${(props) => props.theme.colors.BACKGROUND};
  background-color: ${(props) => props.theme.colors.TITLE};
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 10;

  div {
    padding: 8px;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.BACKGROUND};
    border-bottom: 1px solid #C4C4C4;
    cursor: pointer;
    
    &:last-child {
      border: none;
    }
  }
  ${breakpoint(css`
    top: 69px;
    left: 0;
    border: none;
    border-radius: 0;
    div {
      padding-bottom: 24px;
      border: none;
      text-align: left;
    }
  `)};
`

const Navs = styled(LanguageList)`
  height: calc(100vh - 68px);
`

const VerticalSocials = styled(Socials)`
  border-top: 1px solid #c4c4c4 !important;
  padding-top: 24px!important;
  img {
    width: 32px;
  }
`;

const Languages: React.FC<{
  hideShowList: () => void;
}> = ({ hideShowList }) => {
  return (
    <LanguageList>
      <div
        onClick={() => {
          hideShowList()
          store.dispatch(setLocale(Locale.en))
        }}
      >ENGLISH</div>
      <div
        onClick={() => {
          hideShowList()
          store.dispatch(setLocale(Locale.zh))
        }}
      >汉语</div>
    </LanguageList>
  )
}

export default function Header(props: any): ReactElement {
  const { navList, currentTab, handleChange } = props;
  const [showList, setShowList] = useState(false);
  const [showNavs, setShowNavs] = useState(false);

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <WrapperMobileOnly>
          <HeaderIcon
            src="images/language_icon.svg"
            alt=""
            onClick={() => setShowList(!showList)}
          />
        </WrapperMobileOnly>
        <HeaderDiv>
          <img src="images/Logo.svg" alt="" />
        </HeaderDiv>
        <WrapperMobileOnly>
          <HeaderIcon
            src={showNavs ? 'images/close_icon.svg' : 'images/menu_icon.svg'}
            alt=""
            onClick={() => setShowNavs(!showNavs)}
          />
        </WrapperMobileOnly>
        <WrapperDesktopOnly>
          <HeaderRight>
            <HeaderDiv>
              <Navbar variant="light" className="nav-bar">
                <Nav>
                  {navList.map((nav: any) => (
                    <Link
                      active={currentTab.name === nav.name}
                      onClick={() => handleChange(nav)}
                      key={nav.name}
                    >
                      {nav.name}
                    </Link>
                  ))}
                </Nav>
              </Navbar>
            </HeaderDiv>
            <ButtonIcon>
              <img onClick={() => openUrl('https://apps.apple.com/app/clover-wallet/id1570072858')} src="images/apple_icon.svg" alt="" />
              <img onClick={() => openUrl('https://play.google.com/store/apps/details?id=com.clover.finance.wallet&hl=en_US&gl=US')} src="images/google_play_icon.svg" alt="" />
              <img onClick={() => openUrl('https://chrome.google.com/webstore/detail/clover-wallet/nhnkbkgjikgcigadomkphalanndcapjk')} src="images/chrome_icon.svg" alt="" />
            </ButtonIcon>
            <WebWallet onClick={() => openUrl('https://wallet.clover.finance/')}>{t('webWallet')}</WebWallet>
            <Language>
              <img
                src="images/language_icon.svg"
                alt=""
                onClick={() => setShowList(!showList)}
              />
              {showList && <Languages hideShowList={() => setShowList(false)} />}
            </Language>
          </HeaderRight>
        </WrapperDesktopOnly>
      </HeaderContent>
      <WrapperMobileOnly>
        {showList && <Languages hideShowList={() => setShowList(false)} />}
      </WrapperMobileOnly>
      <WrapperMobileOnly>
        {showNavs && (
          <Navs>
            {navList.map((nav: any) => (
              <div
                onClick={() => {
                  handleChange(nav);
                  setShowNavs(false)
                }}
                key={nav.name}
              >
                {nav.name}
              </div>
            ))}
            <VerticalSocials />
          </Navs>
        )}
      </WrapperMobileOnly>
    </HeaderWrapper>
  );
}
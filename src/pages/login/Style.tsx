import styled, { css } from "styled-components"
import { SubButton, InputWrapper } from "@/components/styleComponents"
import user from "@/assets/imgs/user.png"
import password from "@/assets/imgs/password.png"
import language from "@/assets/imgs/language.png"
import { pxTovw } from "@/utils"

export const Wrapper = styled.div`
  position: relative;
  // min-height: 1280px;
  height: 100%;
  padding: 159px 33px;
  background-position: center !important;
  background-size: cover !important;
  background-color: var(--igt-color-primary);
  @media only screen and (min-width: 750px) {
    display: flex;
    align-items: center;
    // min-height: ${pxTovw(750, 1280)};
    padding: ${pxTovw(160, 1280)} 0;
  }
`
export const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translate(-50%, 0);
  display: block;
  width: 487px;
  // margin: 0 auto;
  // margin-bottom: 66px;
  @media only screen and (min-width: 750px) {
    position: absolute;
    left: ${pxTovw(57, 1280)};
    top: ${pxTovw(54, 1280)};
    transform: translate(0, 0);
    width: ${pxTovw(305, 1280)};
    margin: 0;
  }
`
export const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`
export const Container = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  background: rgba(255, 255, 255, 0.8);
  width: 683px;
  height: 803px;
  padding: 0 48px;
  padding-top: 1px !important;
  border-radius: 14px;
  z-index: 100;
  transform: translate(-50%, 0);
  @media only screen and (min-width: 750px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${pxTovw(480, 1280)};
    height: auto;
    padding: 0 ${pxTovw(30, 1280)};
    padding-bottom: ${pxTovw(30, 1280)};
    border-radius: ${pxTovw(10, 1280)};
  }
`
export const Title = styled.div`
  margin: 0 auto;
  font-weight: 900;
  color: #333333;
  text-align: center;
  font-size: 50px;
  margin-bottom: 28px;
  margin-top: 85px;
  @media only screen and (min-width: 750px) {
    font-size: ${pxTovw(30, 1280)};
    margin-top: ${pxTovw(21, 1280)};
    margin-bottom: ${pxTovw(14, 1280)};
  }
`
export const Description = styled.p`
  margin: 0 auto;
  font-weight: 400;
  color: #333333;
  text-align: center;
  font-size: 28px;
  margin-bottom: 50px;
  letter-spacing: 1.5px;
  @media only screen and (min-width: 750px) {
    margin-bottom: ${pxTovw(11, 1280)};
    font-size: ${pxTovw(15, 1280)};
    opacity: 0.85;
    letter-spacing: ${pxTovw(2, 1280)};
  }
`

export const inputMixin = css`
  width: 100%;
  background-color: #fff;
  padding: 0 76px;
  margin-bottom: 33px;
  input,
  div {
    color: #333;
    text-indent: 0.5em;
    font-size: 30px;
  }
  @media only screen and (min-width: 750px) {
    width: auto;
    height: ${pxTovw(60, 1280)};
    padding: 0 ${pxTovw(55, 1280)};
    padding-left: ${pxTovw(40, 1280)};
    margin-top: ${pxTovw(12, 1280)};

    margin-bottom: 0;
    border-radius: 10px;
    border: 0;
    input,
    div {
      color: #333;
      text-indent: 1em;
      font-size: ${pxTovw(18, 1280)};
    }
  }
`
export const UserInputWrapper = styled(InputWrapper)<{ focus?: boolean }>`
  background-image: url(${user});
  background-repeat: no-repeat;

  ${inputMixin}
  background-position: ${pxTovw(34)} center;
  background-size: ${pxTovw(38)} ${pxTovw(44)};
  margin-top: 48px;
  @media only screen and (min-width: 750px) {
    background-position: ${pxTovw(14, 1280)} center;
    background-size: ${pxTovw(20, 1280)} ${pxTovw(23, 1280)};
    margin: 0;
  }

  ${props =>
    props.focus &&
    css`
      border-color: #40a9ff;
      box-shadow: 0 0 0 ${2}px rgb(24 144 255 / 20%);
    `}
`
export const PasswordInputWrapper = styled(InputWrapper)<{ focus?: boolean }>`
  background: url(${password}) no-repeat;
  ${inputMixin}
  margin-top: 0;
  background-position: ${pxTovw(34)} center;
  background-size: ${pxTovw(38)} ${pxTovw(44)};
  @media only screen and (min-width: 750px) {
    background-position: ${pxTovw(14, 1280)} center;
    background-size: ${pxTovw(20, 1280)} ${pxTovw(23, 1280)};
  }

  ${props =>
    props.focus &&
    css`
      border-color: #40a9ff;
      box-shadow: 0 0 0 ${2}px rgb(24 144 255 / 20%);
    `}
`
export const LanguageInputWrapper = styled(InputWrapper)<{ focus?: boolean }>`
  background: url(${language}) no-repeat;
  ${inputMixin}
  margin-top: 0;
  background-position: ${pxTovw(33)} center;
  background-size: ${pxTovw(42)};
  padding-right: 30px;
  @media only screen and (min-width: 750px) {
    background-position: ${pxTovw(14, 1280)} center;
    background-size: ${pxTovw(20, 1280)} ${pxTovw(22, 1280)};
    padding-right: ${pxTovw(15, 1280)};
  }

  ${props =>
    props.focus &&
    css`
      border-color: #40a9ff;
      box-shadow: 0 0 0 ${2}px rgb(24 144 255 / 20%);
    `}
  overflow: initial;
`
export const ButtonLayout = styled.div`
  width: 50%;
`
export const FooterButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  ${ButtonLayout}:first-child {
    padding-right: 13px;

    @media only screen and (min-width: 750px) {
      padding-right: ${pxTovw(10, 1280)};
    }
  }
  ${ButtonLayout}:last-child {
    padding-left: 13px;

    @media only screen and (min-width: 750px) {
      padding-left: ${pxTovw(10, 1280)};
    }
  }
  @media only screen and (min-width: 750px) {
    margin: 0 ${pxTovw(30, 1280)};
    margin-top: ${pxTovw(24, 1280)};
  }
`
export const RestButton = styled(SubButton).attrs({
  type: "button"
})`
  background: linear-gradient(180deg, #dfdfdf, #ffffff);
  color: #333333;
  border: 1px solid #bfbfbf;

  @media only screen and (min-width: 750px) {
    height: ${pxTovw(60, 1280)};
    font-size: ${pxTovw(24, 1280)};
  }
`
export const SubmitBtn = styled(SubButton)`
  @media only screen and (min-width: 750px) {
    height: ${pxTovw(60, 1280)};
    font-size: ${pxTovw(24, 1280)};
  }
`

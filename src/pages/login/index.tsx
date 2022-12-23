import { useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import styled from "styled-components"

import { Input, Select } from "@/components"

import {
  Wrapper,
  Container,
  Title,
  Description,
  UserInputWrapper,
  PasswordInputWrapper,
  LanguageInputWrapper,
  ButtonLayout,
  FooterButtonWrapper,
  RestButton,
  SubmitBtn,
  Content
} from "./Style"
import type { SubmitHandler } from "react-hook-form"

const defaultValues = {
  UserName: "",
  Password: "",
  Language: "",
  ForceLogin: "N"
}

type FormFieldData = typeof defaultValues


const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8em;
`

const languageMap = [{
  label: "中文",
  value: "zh-CN"
}]

const Login = () => {
  
  const { handleSubmit, control, reset, formState } =
    useForm<FormFieldData>({
      defaultValues: { ...defaultValues }
    })
  
    const submitRef = useRef<HTMLInputElement>(null)

  const onSubmit: SubmitHandler<FormFieldData> = values => {
    console.log(values)
  }
  /**
   * @function jumpPageAccordingToDeviceType 根据设备类型跳转也页面
   */
  /*
  const jumpPageAccordingToDeviceType = (type: DeviceType) => {
    switch (type) {
      case deviceTypeMap.H:
        navigate("/device/RDT/home", {
          replace: true
        })
        break
      case deviceTypeMap.T:
        navigate("/device/truck", {
          replace: true
        })
        break
      case deviceTypeMap.Y:
      case deviceTypeMap.F:
        navigate("/device/RTG/yard", {
          replace: true
        })
        break
      case deviceTypeMap.S:
        break
      default:
    }
  }
  */

  const handleReset = () => {
    reset(defaultValues)
  }

  return (
    <Wrapper>
      
      <Content>
        <Container>
          <Title>Title</Title>
          <Description>{"请输入用户名密码登录"}</Description>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // initialValues={{
            //   Language: i18n.language,
            //   ForceLogin: "N"
            // }}
            // onValuesChange={onValuesChange}
          >
            <Controller
              name="UserName"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <UserInputWrapper>
                  <Input transform="Upper" maxLen={15} {...field} />
                </UserInputWrapper>
              )}
            />
            <Controller
              name="Password"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <PasswordInputWrapper>
                  <Input maxLen={15} type="password" {...field} />
                </PasswordInputWrapper>
              )}
            />
              <Controller
                name="Language"
                control={control}
                render={({ field }) => (
                  <LanguageInputWrapper>
                    <Select {...field} options={languageMap} />
                  </LanguageInputWrapper>
                )}
              />

            <FooterButtonWrapper>
              <ButtonLayout>
                <RestButton onClick={handleReset} value="重置" />
              </ButtonLayout>
              <ButtonLayout>
                <SubmitBtn
                  ref={submitRef}
                  disabled={formState.isSubmitting}
                  value="应用"
                />
              </ButtonLayout>
            </FooterButtonWrapper>
            {/* <Form.Item name="Language" label={t("Login.Language")} required>
          <Radio.Group>
            <Space>
              {[...new Array(2).keys()].map((i: number) => {
                return (
                  <Radio key={i} value={t(`Login.LanguageOption.${i as Index}.value`)}>
                    {t(`Login.LanguageOption.${i as Index}.name`)}
                  </Radio>
                )
              })}
            </Space>
          </Radio.Group>
        </Form.Item> */}
          </form>
        </Container>
      </Content>
      <Footer>1.0.0 DEV</Footer>
    </Wrapper>
  )
}

export default Login

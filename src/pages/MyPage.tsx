// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  // Navbar,
  ProfileImage,
  CustomButton,
  CustomInput,
  CustomNicknameInput,
} from '../components';
// import { apiKey } from '../api/firebaseService';
import { Link } from 'react-router-dom';
import usePwdManager from '../hooks/usePwdManager';
import useButtonReactions from '../hooks/useButtonReactions';
import useLoginState from '../hooks/useLoginState';
import useEditProfile from '../hooks/useEditProfile';
// import ProfileImage from '../components/ProfileImage';

// interface pwdRelatedValueTypes {
//   currentPwd: string;
//   newPwd: string;
//   confirmNewPwd: string;
//   isCurrentPwd: boolean;
//   isValidPwd: boolean;
//   isSamePwd: boolean;
//   currentPwdObserver: string;
//   newPwdObserver: string;
//   confirmNewPwdObserver: string;
// }

const MyPage = () => {
  const { isLoggedIn, isAuthorizedInSession } = useLoginState();
  const { pwdRelatedValues, onChangePwd } = usePwdManager();
  const {
    userNickname,
    userNicknameObserver,
    isValidNickname,
    onChangeUserNickname,
    setUserNickname,
  } = useEditProfile();
  const {
    handleChangeNickname,
    handleLogOut,
    handleChangePwd,
    handleDeleteAccount,
  } = useButtonReactions({ pwdRelatedValues, userNickname, setUserNickname });

  return (
    <>
      {isLoggedIn && isAuthorizedInSession ? (
        <Container>
          <ProfileWrapper>
            마이페이지
            <ProfileImage />
            <CustomNicknameInput
              userNickname={userNickname}
              userNicknameObserver={userNicknameObserver}
              isValidNickname={isValidNickname}
              onChangeUserNickname={onChangeUserNickname}
            />
            <CustomButton onClickEvent={handleChangeNickname}>
              닉네임 변경
            </CustomButton>
          </ProfileWrapper>
          <InputWrapper>
            <CustomInput
              type="password"
              value={pwdRelatedValues.currentPwd}
              observeValue={pwdRelatedValues.isCurrentPwd}
              observeContent={pwdRelatedValues.currentPwdObserver}
              placeholder="기존 비밀번호를 입력하세요"
              name="currentPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.newPwd}
              observeValue={pwdRelatedValues.isValidPwd}
              observeContent={pwdRelatedValues.newPwdObserver}
              placeholder="새 비밀번호를 입력하세요"
              name="newPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.confirmNewPwd}
              observeValue={pwdRelatedValues.isSamePwd}
              observeContent={pwdRelatedValues.confirmNewPwdObserver}
              placeholder="같은 비밀번호를 입력하세요"
              name="confirmNewPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <BtnWrapper>
              <CustomButton onClickEvent={handleLogOut}>로그아웃</CustomButton>
              <CustomButton onClickEvent={handleChangePwd}>
                비밀번호 변경
              </CustomButton>
              <CustomButton onClickEvent={handleDeleteAccount}>
                회원탈퇴
              </CustomButton>
            </BtnWrapper>
          </InputWrapper>
        </Container>
      ) : (
        <Container>
          <NoticeWrapper>
            서비스를 이용하시려면&nbsp;
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: 'blue',
              }}
              to={'/login'}
            >
              로그인
            </Link>
            &nbsp;해주세요.
          </NoticeWrapper>
        </Container>
      )}
    </>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 15rem;
  /* width: 40%; */
  /* height: 60%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BtnWrapper = styled.div`
  flex-direction: row;
`;

const NoticeWrapper = styled.div``;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

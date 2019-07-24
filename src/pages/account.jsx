// import React from "react";
// import styled from "styled-components";
// import { Formik } from "formik";
// import { Label, Button, TextInputField } from "evergreen-ui";
// import { distanceInWordsToNow } from "date-fns";
// import { useStore, useActions } from "../configureStore";

// import NoUser from "../assets/icons/nouser.svg";
const Account = () => {
}
export default Account
// const Account = props => {
//   const currentUser = useStore(state => state.user.user);
//   const profile = useStore(state => state.profile.profile);
//   const getMe = useActions(actions => actions.user.getMe);
//   const editProfile = useActions(action => action.profile.editProfile);
//   const editProfilePassword = useActions(
//     action => action.profile.editProfilePassword
//   );

//   useEffect(() => {
//     getMe();
//   }, [profile]);

//   return (
//     <Container>
//       <Header />
//       <BoxLight>
//         <ContainerWelcome>
//           <Username>{currentUser.name}</Username>
//           <Text>This is your profile page.</Text>
//         </ContainerWelcome>
//       </BoxLight>
//       <ContainerGrid>
//         <Grid>
//           <div style={{ zIndex: 9999 }}>
//             <Formik
//               enableReinitialize
//               initialValues={{
//                 name: currentUser.name,
//                 email: currentUser.email,
//                 phone: currentUser.phone,
//                 wallet_id: !currentUser.wallet_id ? "" : currentUser.wallet_id
//               }}
//               validate={values => {
//                 let errors = {};
//                 if (!values.name) {
//                   errors.name = "Obrigatório";
//                 }

//                 if (!values.email) {
//                   errors.email = "Obrigatório";
//                 }

//                 if (!values.phone) {
//                   errors.phone = "Obrigatório";
//                 }
//                 return errors;
//               }}
//               onSubmit={(values, { setSubmitting }) => {
//                 if (values.email === currentUser.email) {
//                   delete values.email;
//                 }
//                 editProfile(values);
//                 setSubmitting(false);
//               }}
//             >
//               {({
//                 values,
//                 errors,
//                 touched,
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 isSubmitting
//               }) => (
//                 <form onSubmit={handleSubmit}>
//                   <ContainerForm>
//                     <HeaderForm>
//                       <h3>Edit profile</h3>
//                     </HeaderForm>
//                     <TitleBoxForm>User Information</TitleBoxForm>
//                     <InlineInputs>
//                       <TextField
//                         label="Your sponsor"
//                         inputHeight={45}
//                         disabled
//                         name="sponsor"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={currentUser.sponsor}
//                       />
//                       <TextField
//                         label="Username"
//                         inputHeight={45}
//                         disabled
//                         name="username"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={currentUser.username}
//                       />
//                     </InlineInputs>
//                     <InlineInputs>
//                       <div>
//                         <TextField
//                           label="Your Name"
//                           inputHeight={45}
//                           name="name"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           value={values.name}
//                           // validationMessage={
//                           //   errors.name && touched.name && errors.name
//                           // }
//                         />
//                         {/* <MessageError>
//                           {errors.name && touched.name && errors.name}
//                         </MessageError> */}
//                       </div>
//                       <TextField
//                         label="E-mail"
//                         type="email"
//                         inputHeight={45}
//                         // validationMessage={
//                         //   errors.email && touched.email && errors.email
//                         // }
//                         name="email"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.email}
//                       />
//                     </InlineInputs>
//                     <InlineInputs>
//                       <TextField
//                         label="Phone"
//                         type="text"
//                         // validationMessage={
//                         //   errors.phone && touched.phone && errors.phone
//                         // }
//                         inputHeight={45}
//                         name="phone"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.phone}
//                       />
//                     </InlineInputs>
//                     <ContainerButton id="buttonEnd">
//                       <Button appearance="primary" type="submit" height={40}>
//                         Save
//                       </Button>
//                     </ContainerButton>
//                   </ContainerForm>
//                 </form>
//               )}
//             </Formik>
//             <Formik
//               initialValues={{ newpassword: "", confirmPassword: "" }}
//               validate={values => {
//                 let errors = {};
//                 if (!values.newpassword) {
//                   errors.oldPassword = "Required";
//                 }

//                 if (!values.confirmPassword) {
//                   errors.confirmPassword = "Required";
//                 }

//                 if (values.newpassword !== values.confirmPassword) {
//                   errors.confirmPassword = "Invalid verification password";
//                 }
//                 return errors;
//               }}
//               onSubmit={(values, { setSubmitting }) => {
//                 if (values.newpassword === values.confirmPassword) {
//                   editProfilePassword({ password: values.newpassword });
//                 }
//                 setSubmitting(false);
//               }}
//             >
//               {({
//                 values,
//                 errors,
//                 touched,
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 isSubmitting
//               }) => (
//                 <form onSubmit={handleSubmit}>
//                   <ContainerGridPassword>
//                     <HeaderForm>
//                       <h3>Edit password</h3>
//                       {/* <Button appearance="primary" height={40}>
//                         Save
//                       </Button> */}
//                     </HeaderForm>
//                     <TitleBoxForm>Password</TitleBoxForm>
//                     <InlineInputs>
//                       <TextField
//                         label="Password"
//                         type="password"
//                         inputHeight={45}
//                         validationMessage={
//                           errors.newpassword &&
//                           touched.newpassword &&
//                           errors.newpassword
//                         }
//                         name="newpassword"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.newpassword}
//                       />
//                       <TextField
//                         label="Confirm Password"
//                         type="password"
//                         inputHeight={45}
//                         validationMessage={
//                           errors.confirmPassword &&
//                           touched.confirmPassword &&
//                           errors.confirmPassword
//                         }
//                         name="confirmPassword"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.confirmPassword}
//                       />
//                     </InlineInputs>
//                     <ContainerButton id="buttonEnd">
//                       <Button appearance="primary" height={40}>
//                         Save
//                       </Button>
//                     </ContainerButton>
//                   </ContainerGridPassword>
//                 </form>
//               )}
//             </Formik>
//           </div>
//           <ContainerInfoUser>
//             <ImageHeader src={""} />
//             {currentUser.image ? (
//               <BoxAvatar>
//                 <AvatarUser src={currentUser.image} />
//               </BoxAvatar>
//             ) : (
//               <BoxWithoutAvatar>
//                 <WithoutAvatar src={NoUser} />
//               </BoxWithoutAvatar>
//             )}
//             <InfoUser>
//               <UserName>{currentUser.username}</UserName>
//             </InfoUser>
//           </ContainerInfoUser>
//         </Grid>
//       </ContainerGrid>
//       {/* password */}
//     </Container>
//   );
// };

// export default Account;

// const Container = styled.div``;

// const Header = styled.div`
//   width: 100%;
//   height: 400px;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background: #172b4d;
//   /* opacity: 0.2; */
// `;

// const BoxLight = styled.div`
//   width: 100%;
//   height: 400px;
//   position: absolute;
//   top: 80px;
//   left: 0;
//   background: #172b4d;
//   z-index: 1;
//   /* opacity: 0.1; */
// `;

// const ContainerWelcome = styled.div`
//   margin-left: 290px;
//   padding: 2em 0 0;
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 1200px) {
//     margin-left: 0;
//     padding-left: 2.1em;
//     padding-right: 2.1em;
//   }
// `;

// const Username = styled.div`
//   color: #fff;
//   z-index: 9999;
//   font-size: 45px;
//   font-weight: 700px;
//   margin-bottom: 0.2em;
// `;

// const Text = styled.div`
//   max-width: 500px;
//   font-size: 15px;
//   color: #fff;
//   font-weight: 300;
//   margin-top: 0;
// `;

// const ContainerGrid = styled.div`
//   margin-top: 230px;
//   padding: 1em;
//   z-index: 9999;
//   position: relative;
// `;

// const ContainerGridPassword = styled.div`
//   z-index: 9999;
//   background-color: #fff;
//   margin-top: 1.5em;
//   box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
//   border-radius: 0.3em;
//   display: flex;
//   flex-direction: column;
//   #buttonEnd {
//     align-content: flex-end;
//     align-self: flex-end;
//   }
// `;

// const ContainerButton = styled.div`
//   padding: 1em 1em 1em 0;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   grid-gap: 20px;
//   h1 {
//     color: red;
//   }
//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
//   form {
//     z-index: 9999;
//   }
// `;

// //form
// const ContainerForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-content: flex-start;
//   background: #fff;
//   z-index: 9999;
//   height: 100%;
//   box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
//   border-radius: 0.3em;
//   #buttonEnd {
//     align-content: flex-end;
//     align-self: flex-end;
//   }
// `;

// const TitleBoxForm = styled.p`
//   color: #b8b8b8;
//   font-size: 13px;
//   font-weight: 600;
//   margin: 2em;
//   letter-spacing: 0.04em;
//   text-transform: uppercase;
//   @media (max-width: 900px) {
//     margin: 2em 2em 0 2em;
//   }
// `;

// const HeaderForm = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 1em 1.5em;
//   border-bottom: 1px solid #eee;
//   align-items: center;
//   h3 {
//     margin: 0;
//     font-weight: 300;
//     font-size: 18px;
//   }
// `;

// const FormProfile = styled.form``;

// const InlineInputs = styled.div`
//   padding: 0em 1em 1em 2.5em;
//   max-height: 300px;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: 30px;
//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//     padding: 1em 1em 0em 1em;
//     margin-top: 1em;
//   }
// `;

// const TextField = styled(TextInputField)`
//   box-shadow: inset 0 0 0 1px #e0e0e0, inset 0 1px 1px #e0e0e0;
//   margin-bottom: 10px;

//   @media (max-width: 900px) {
//     margin-bottom: 0px;
//   }
// `;

// //infouser

// const ContainerInfoUser = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 9999;
//   /* height: 100%; */
//   height: 410px;
//   background: #fff;
//   box-shadow: 0 0 1rem 0 rgba(136, 152, 170, 0.15);
//   border-radius: 0.3em;
//   img:first-child {
//     align-self: flex-start;
//   }
// `;

// const ImageHeader = styled.img`
//   width: 100%;
//   height: 192px;
//   border-radius: 0.25em 0.25em 0 0;
// `;

// const BoxAvatar = styled.div`
//   margin-top: -70px;
//   border: 0.3em solid #fff;
//   border-radius: 7em;
// `;
// const AvatarUser = styled.img`
//   z-index: 9999;
//   width: 140px;
//   height: 140px;
//   border-radius: 6em;
// `;

// const BoxWithoutAvatar = styled.div`
//   margin-top: -70px;
//   border-radius: 7em;
//   background: #fff;
// `;

// const WithoutAvatar = styled.img`
//   z-index: 9999;
//   width: 140px;
//   height: 140px;
//   border-radius: 6em;
// `;

// const InfoUser = styled.div``;

// const UserName = styled.div`
//   text-align: center;
//   font-size: 22px;
//   color: #000;
// `;

// const Since = styled.div`
//   margin: 0.3em 0;
//   font-size: 17px;
//   text-align: center;
//   color: #828282;
// `;

// const ActiveDays = styled.div`
//   font-size: 17px;
//   text-align: center;
//   color: #828282;
// `;

// const MessageError = styled.span`
//   transition: 0.2s ease-in-out;
//   margin-bottom: 5px;
//   color: ${props => props.theme.color.red};
//   font-size: 1em;
// `;

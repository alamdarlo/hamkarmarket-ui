import { LoginFormWithCaptch } from "../../components/LoginFormWithCaptch";
import { LoginFormWithPasswordAndSms } from "../../components/LoginFormWithPasswordAndSms";
import { SimpleLoginForm } from "../../components/SimpleLoginForm";

export default function Page() {
    return (
        <>
        {/* <SimpleLoginForm /> */}
        {/* <LoginFormWithCaptch/> */}
        <LoginFormWithPasswordAndSms />
        </>
    )
}

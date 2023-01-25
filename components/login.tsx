'use client'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useRouter } from "next/navigation";

interface Values {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const loginUser = async (body: Values) => {
    try {
      const res = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
      const { user } = await res.json();
      // if data present - redirect to dashboard
      if (user) {
        router.push(`/`);
      } else {
        // user is not in the db - route to sign up page
        // NEED TO ADD MESSAGE EXPLAINING WHAT TO DO + WHY
        router.push(`/register`);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-slate-800 container mx-auto w-80 flex justify-center rounded'>
      <div className='flex-col align-center'>
        <h1 className="flex-col align-center m-3 font-bold text-lg text-slate-200">Login</h1>
        <Formik
          initialValues={{
              email: '',
              password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .min(5, "Must be at least 5 characters")
              .required("Required"),
            password: Yup.string()
              .min(5, "Must be at least 5 characters")
              .required("Required"),
          })}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            console.log('onSubmit', values);
            loginUser(values);
            setSubmitting(false);
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 500);
          }}  
        >
          <Form>
              <div className='m-2'>
                <Field 
                  className="
                  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  "
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  aria-describedby="usernameHelp" 
                />
              </div>
    
              <div className='m-2'>
                <Field 
                  className="
                  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  "
                  id="password" 
                  name="password" 
                  placeholder="Password" 
                  type="password" 
                />
              </div>
              <div className='flex justify-center'>
                <button 
                  type="submit" 
                  // disabled={!input}
                  className='bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 hover:scale-110 hover:accent-white'
                  // "
                  //   bg-sky-400 hover:bg-sky-600 hover:scale-125 hover:accent-white text-slate-200 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed
                  // "
                >Login</button>
              </div>
          </Form>
        </Formik>
      </div>
      
    </div>
  )
}
import React from 'react';
import { Formik, Form, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';

// Form validation schema
const PostFormSchema = Yup.object().shape({
  postBody: Yup.string().required('Post body is missing')
});

class PostForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          postBody: ''
        }}
        validationSchema={PostFormSchema}
        onSubmit={(post: any, { setSubmitting }: FormikHelpers<any>) => {
          setSubmitting(false);
          // TODO: create post
        }}
        render={({ errors, touched, isSubmitting }) => (
          <Form style={{ width: '60%' }}>
            <div className="form-field">
              <Field
                id="postBody"
                name="postBody"
                placeholder="What's on your mind?"
                type="text"
                as="textarea"
              />
              <div style={{ display: 'flex' }}>
                <div className="error">
                  {errors.postBody && touched.postBody ? errors.postBody : null}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 'auto' }}
                >
                  Post
                </button>
              </div>
            </div>
          </Form>
        )}
      />
    );
  }
}

export default PostForm;

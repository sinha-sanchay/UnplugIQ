import React, { useState } from 'react';
import { Button } from '@/components/common';
import { useForm } from '@/hooks/useForm';
import { SubmissionFormData } from '@/types/forms';
import './SubmissionForm.css';

interface SubmissionFormProps {
  challengeId: number;
  onSubmit: (submissionText: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  existingSubmission?: string;
  maxLength?: number;
}

/**
 * SubmissionForm component with text area and character count
 * Handles submission validation and user feedback
 */
const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  existingSubmission,
  maxLength = 2000,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<SubmissionFormData>({
    initialValues: {
      submissionText: existingSubmission || '',
    },
    validationRules: {
      submissionText: {
        required: true,
        minLength: 10,
        maxLength,
        custom: (value: string) => {
          const trimmedValue = value.trim();
          if (!trimmedValue) {
            return 'This field is required';
          }
          if (trimmedValue.length < 10) {
            return 'Response must be at least 10 characters';
          }
          if (trimmedValue.length > maxLength) {
            return `Response must be no more than ${maxLength} characters`;
          }
          return null;
        },
      },
    },
    onSubmit: async (formValues) => {
      try {
        await onSubmit(formValues.submissionText);
        setIsSubmitted(true);
      } catch (error) {
        // Error is handled by parent component
        console.error('Submission failed:', error);
      }
    },
  });

  const characterCount = values.submissionText.length;
  const isOverLimit = characterCount > maxLength;
  const isNearLimit = characterCount > maxLength * 0.8;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange('submissionText', e.target.value);
  };

  const handleTextareaBlur = () => {
    handleBlur('submissionText');
  };

  const handleReset = () => {
    resetForm();
    setIsSubmitted(false);
  };

  if (isSubmitted && !error) {
    return (
      <div className="submission-form__success">
        <div className="submission-form__success-icon">✓</div>
        <h3>Submission Successful!</h3>
        <p>Your response has been submitted successfully.</p>
        <Button
          variant="outline"
          onClick={handleReset}
          className="submission-form__edit-button"
        >
          Edit Submission
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <div className="submission-form__field">
        <label htmlFor="submissionText" className="submission-form__label">
          Your Response
          <span className="submission-form__required">*</span>
        </label>
        
        <textarea
          id="submissionText"
          name="submissionText"
          value={values.submissionText}
          onChange={handleTextareaChange}
          onBlur={handleTextareaBlur}
          className={`submission-form__textarea ${
            errors.submissionText && touched.submissionText ? 'submission-form__textarea--error' : ''
          } ${isOverLimit ? 'submission-form__textarea--over-limit' : ''}`}
          placeholder="Enter your response here..."
          rows={8}
          disabled={isLoading || isSubmitting}
          aria-describedby="submissionText-error submissionText-count"
        />
        
        <div className="submission-form__meta">
          <div
            id="submissionText-count"
            className={`submission-form__character-count ${
              isNearLimit ? 'submission-form__character-count--warning' : ''
            } ${isOverLimit ? 'submission-form__character-count--error' : ''}`}
          >
            {characterCount} / {maxLength} characters
          </div>
        </div>

        {errors.submissionText && touched.submissionText && (
          <div
            id="submissionText-error"
            className="submission-form__error"
            role="alert"
          >
            {errors.submissionText}
          </div>
        )}
      </div>

      {error && (
        <div className="submission-form__error submission-form__error--general" role="alert">
          {error}
        </div>
      )}

      <div className="submission-form__actions">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting || isLoading}
          disabled={isOverLimit || !values.submissionText.trim()}
          fullWidth
        >
          {existingSubmission ? 'Update Submission' : 'Submit Response'}
        </Button>
        
        {existingSubmission && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting || isLoading}
          >
            Reset to Original
          </Button>
        )}
      </div>
    </form>
  );
};

export default SubmissionForm;
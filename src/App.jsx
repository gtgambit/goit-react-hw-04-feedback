import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistic from 'components/Statistic/Statistic';
import Section from 'components/Section/Section';
import { useState } from 'react';
import { Notification } from './utils/Notification/Notification';

export const App = () => {
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [good, setGood] = useState(0);

  const onFeedback = event => {
    switch (event.target.name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) return;
    return Math.floor((good / countTotalFeedback()) * 100);
  };

  return (
    <Section title="Please leave your feedback:">
      <FeedbackOptions
        options={['good', 'bad', 'neutral']}
        OnLeaveFeedback={onFeedback}
      />
      {countTotalFeedback() ? (
        <Statistic
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};

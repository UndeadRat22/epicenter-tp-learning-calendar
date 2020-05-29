using System;
using System.Collections.Generic;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Service.Strategy.Interface.Topic;
using Epicenter.Service.Strategy.Topic;
using NUnit.Framework;

namespace Epicenter.UnitTests.Strategy.Topic
{
    [TestFixture]
    public class EmployeeTopicProgressStrategyTests
    {
        [Test]
        public void Returns_Not_Planned_When_Employee_Has_No_Personal_Goals_And_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>(),
                LearningDays = new List<LearningDay>()
            };

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.NotPlanned);
        }

        [Test]
        public void Returns_Not_Planned_When_Employee_Has_Incomplete_Goals_Without_Learning_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>
                {
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = null
                    },
                    new PersonalGoal
                    {
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    }
                },
                LearningDays = new List<LearningDay>()
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.NotPlanned);
        }

        [Test]
        public void Returns_NotPlanned_When_Employee_Has_Incomplete_Goals_With_Complete_Learning_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>
                {
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    },
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = null
                    }
                },
                LearningDays = new List<LearningDay>
                {
                    new LearningDay
                    {
                        Date = DateTime.Today.AddDays(-1),
                        LearningDayTopics = new List<LearningDayTopic>
                        {
                            new LearningDayTopic
                            {
                                TopicId = topic.Id,
                                Topic = topic,
                                ProgressStatus = ProgressStatus.Done
                            }
                        }
                    }
                }
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.NotPlanned);
        }

        [Test]
        public void Returns_Learned_When_Employee_Has_All_Goals_Complete_Without_Learning_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>
                {
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    },
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    }
                },
                LearningDays = new List<LearningDay>()
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.Learned);
        }

        [Test]
        public void Returns_Learned_When_Employee_Has_All_Goals_Complete_With_Complete_Learning_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>
                {
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    },
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    }
                },
                LearningDays = new List<LearningDay>
                {
                    new LearningDay
                    {
                        Date = DateTime.Today.AddDays(-1),
                        LearningDayTopics = new List<LearningDayTopic>
                        {
                            new LearningDayTopic
                            {
                                TopicId = topic.Id,
                                Topic = topic,
                                ProgressStatus = ProgressStatus.Done
                            }
                        }
                    }
                }
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.Learned);
        }

        [Test]
        public void Returns_Planned_When_Employee_Has_Incomplete_Future_Learning_Days()
        {
            //arrange
            IEmployeeTopicProgressStatusStrategy strategy = new EmployeeTopicProgressStatusStrategy();

            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Id = new Guid()
            };

            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                PersonalGoals = new List<PersonalGoal>
                {
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    },
                    new PersonalGoal
                    {
                        Topic = topic,
                        TopicId = topic.Id,
                        CompletionDate = DateTime.Now
                    }
                },
                LearningDays = new List<LearningDay>
                {
                    new LearningDay
                    {
                        Date = DateTime.Today.AddDays(-1),
                        LearningDayTopics = new List<LearningDayTopic>
                        {
                            new LearningDayTopic
                            {
                                TopicId = topic.Id,
                                Topic = topic,
                                ProgressStatus = ProgressStatus.Done
                            }
                        }
                    },
                    new LearningDay
                    {
                        Date = DateTime.Today.AddDays(10),
                        LearningDayTopics = new List<LearningDayTopic>
                        {
                            new LearningDayTopic
                            {
                                TopicId = topic.Id,
                                Topic = topic,
                                ProgressStatus = ProgressStatus.InProgress
                            }
                        }
                    }
                }
            };
            //act
            var status = strategy.GetStatus(employee, topic);
            //assert
            Assert.That(status == Status.Planned);
        }
    }
}
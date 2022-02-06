import React from "react";

import Task from "./Task";

export default {
  component: Task,
  title: "Task",
};

const Template = args => <Task {...args} />;

// 스토리는 컴포넌트와 그 하위 스토리의 두가지 단계로 구성됨
// 스토리를 정의하기 위해서는 각각 테스트 state에 해당하는 스토리를 만들기 위한 함수를 내보낸다.
// 스토리는 주어진 state안에서 렌더링된 요소 (예를 들면 prop이 포함된 컴포넌트)를 리턴하는 함수이다.

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

// args라는 인수는 스토리북의 Controls addon으로 컴포넌트를 실시간으로 수정할 수 있다.
// args의 값이 변화면 컴포넌트도 함께 변함 (일반적인 함수형 컴포넌트의 prop 역할)

// UI 컴포넌트를 독립적으로 만들때 컴포넌트와 상호작용을 하기 위해서는 actions를 사용한다.

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};

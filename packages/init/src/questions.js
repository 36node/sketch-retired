module.exports = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目名称:'
  },
  {
    type: 'list',
    name: 'templateName',
    message: '请选择要创建的项目类型:',
    choices: [
      'base',
      'node',
      'react',
      'react-redux',
      'react-mobx'
    ]
  }
];

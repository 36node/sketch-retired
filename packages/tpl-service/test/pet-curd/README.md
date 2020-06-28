# 测试用例

项目增删改查业务逻辑测试

请严格按照 swagger 文档检查请求和返回结果，不再一一赘述。

需要处理边界条件，比如项目不存在时返回 404 错误。

## 数据清单:

- USER: 公共用户

```
// id
5cb9a4edc48ad400120d28b0
// token
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWNiOWE0ZWRjNDhhZDQwMDEyMGQyOGIwIiwiZXhwIjoyNTU3MDM1MjU4LCJucyI6Ii9hZHZlbnR1cmVyIn0.gKb4bRq2RN_gFO03nYDYgjeqTsNdTvmjcnjLbvSfmXVRbX2B0jxl0gaPN31EKfOg1GKkRUxY-y9oqYITajOAcfqfUFGj4p-42iXL8IFiKO8aLmmQl7AuTo_Z0wfL630w8ZSeunfJ4VhbucaCzghzBHPqdD73QdibqNOyK0S8s8E
```

## 业务流程

- USER: Create a pet
- USER: Find pet by id
- USER: Find pet by wrong id
- USER: Update pet
- USER: List all pets
- USER: delete pet


<template>
	<div class="amap-page-container" >
		<div class="rigtop" style="text-align: center;font-size: 18px;border: 0px;">
			<marquee style="width: 100%;">
				<!-- 如信息有问题请拨打400-1000-0001电话联系客服进行修改信息，感谢您对我们工作的支持，谢谢！ -->
			</marquee>
			</MenuItem>
		</div>
			<Form ref="formValidate" :model="staff" :label-width="80" style="position:relative;left: 110px;">
				<Row>
					<Col span="8">
					<FormItem label="编号" prop="contacts">
						<Input v-model="staff.dId" disabled  ></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="姓名" prop="contacts">
						<Input v-model="staff.dName" disabled   ></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="手机号码" prop="startDate">
						<Input v-model="staff.dPhone" disabled   ></Input>
					</FormItem>
					</Col>
			
					<Col span="8">
					<FormItem label="身份证" prop="contacts">
						<Input v-model="staff.dUuid" disabled   ></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="余额" prop="contacts">
						<Input v-model="staff.dBalance" disabled   ></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="注册时间" prop="startDate">
						<Input v-model="staff.registerDate" disabled   ></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				url: "http://localhost:8080",
				staff: {
					dId: 0,
					dName: '',
					dSex: '',
					dUuid: '',
					dPhone: '',
					dPassword: '',
					dBalance: 0,
					registerDate: ''
				},
			}
		},
		methods: {
			
		},
		created() {
			var th = this;
			axios.get(th.url + '/staff/selectByPrimaryKey', {
				params: {
					id:localStorage.getItem("mUser")
				}
			}).then(function(res) {
				th.staff = res.data.data;
			})
			
		}
	}
</script>

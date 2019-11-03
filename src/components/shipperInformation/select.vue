<style>
	.ivu-table td, .ivu-table-border td{
		height: 41px;
	}
</style>
<template>
	<div>
			<div class="rigtop">
				<Form ref="admin" inline>
					<!-- <FormItem>
						性别 :
						<RadioGroup v-model="aSex">
							<Radio label="">
								<Icon type="ios-eye" />
								<span>全部</span>
							</Radio>
							<Radio label="男">
								<Icon type="ios-eye" />
								<span>男</span>
							</Radio>
							<Radio label="女">
								<Icon type="ios-eye-off" />
								<span>女</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem style="position: relative;left: 10px">
						<Button @click="changePage(1)">
							<Icon type="ios-sync" />快速查询
						</Button>
					</FormItem> -->
					<FormItem style="position: absolute;right: 30px">
						<FormItem>
							<Button @click="add()">
								<Icon type="ios-add-circle-outline" />添加记录
							</Button>
						</FormItem>
						<Button @click="exportData()">
							<Icon type="ios-download-outline" />数据导出
						</Button>
					</FormItem>
				</Form>
			</div>



		<Table border :columns="columns7" :data="data6" height="450" :loading="loading" stripe size='default' ref="table"></Table>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="count" :current="1" @on-change="changePage($event)"></Page>
			</div>
		</div>

		<Modal v-model="modal14" :loading="modal14loading" scrollable :title="title" @on-ok="addok">
			<Form ref="formValidate" :model="admin" :label-width="80">
				<FormItem label="账号" prop="aAccount">
					<Input v-model="admin.aAccount" :maxlength=20 placeholder="请输入账号"></Input>
				</FormItem>
				<FormItem label="密码" prop="aPassword">
					<Input type="password" v-model="admin.aPassword" :maxlength=20 placeholder="请输入密码"></Input>
									</FormItem>
					<FormItem label="姓名" prop="aName">
					<Input v-model="admin.aName" :maxlength=20 placeholder="请输入姓名"></Input>
				</FormItem>
				</FormItem>
				<FormItem label="权限" prop="aPower">
					<Input v-model="admin.aPower" placeholder="1:管理员/0:网点管理员"></Input>
				</FormItem>
				<FormItem label="性别" prop="aSex">
				<Select v-model="admin.aSex" style="width: 150px;">
					<Option v-for="item in xb" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</FormItem>
				<FormItem label="手机号码" prop="aPhone">
					<Input type="password" v-model="admin.aPhone" :maxlength=11 placeholder="请输入手机号码"></Input>
				</FormItem>
				<FormItem label="类型" prop="aType">
					<Input v-model="admin.aType" placeholder="管理员/网点管理员"></Input>
				</FormItem>
				<FormItem label="网点编号" prop="nId">
					<Input v-model="admin.nId"  placeholder="网点号"></Input>
				</FormItem>
			</Form>
		</Modal>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				modal14loading: true,
				loading: true,
				modal14: false,
				loading: true,
				qx: [{
						value: '管理员',
						label: '管理员'
					},
					{
						value: '网点管理员',
						label: '网点管理员'
					}
				],
				xb: [{
						value: '男',
						label: '男'
					},
					{
						value: '女',
						label: '女'
					}
				],
				url: "http://localhost:8080",
				count: 10,
				columns7: [{
						title: '编号',
						key: 'aId',
						align: 'center',
						width: 100
					},{
						title: '账号',
						key: 'aAccount',
						align: 'center',
						},{
						title: '姓名',
						key: 'aName',
						align: 'center',
					},{
						title: '性别',
						key: 'aSex',
						align: 'center',
					},

					{
						title: '手机号码',
						key: 'aPhone',
						align: 'center',
					},
					{
						title: '网点编号',
						key: 'nId',
						align: 'center'
					},
					{
						title: '类型',
						key: 'aType',
						align: 'center',
						tooltip: true
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.row)
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {

											this.remove(params.row.aId)
										}
									}
								}, '移除')
							]);
						}
					}
				],
				data6: [],
				admin:{
					aId:0,
					aAccount:'',
					aPassword:'',
					aName:'',
					aType:'',
					aSex:'',
					aPhone:'',
					aPower:'',
					nId:0
				}
			}
		},
		methods: {
			//单击添加
				add() {
					this.title = "添加网点管理员信息";
					this.admin.aAccount = "";
					this.admin.aPassword = "";
					this.admin.aName= "";
					this.admin.aType = "";
					this.admin.aSex = "";
					this.admin.aPhone = "";
					this.admin.aPower = "";
					this.admin.nId = "";
					this.modal14 = true;
				},
				//单击编辑
				show(data) {
					this.title = '编辑网点管理员信息'
					this.admin.aId = data.aId;
					this.admin.aAccount = data.aAccount;
					this.admin.aPassword = data.aPassword;
					this.admin.aName = data.aName;
					this.admin.aType = data.aType;
					this.admin.aSex = data.aSex;
					this.admin.aPhone = data.aPhone;
					this.admin.aPower = data.aPower;
					this.admin.nId = data.nId;
					this.modal14 = true;
				},
				//弹出添加保存
				addok(){
				const th = this;
				var urls = "insert";
				if (this.title == "编辑网点管理员信息") {
					urls = "updateByPrimaryKey";
				}
				axios.post(th.url + '/admin/' + urls, th.admin, {
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					}
				}).then(function(res) {
					if (res.data.code === 200) {
						th.$Message.success(res.data.message);
						th.modal14 = false;
						th.changePage(1);
					} else {
						th.modal14show();
						th.$Message.error(res.data.message);
					}
				})


			},
			modal14show() {
				this.modal14 = false;
				setTimeout(() => {
					this.modal14 = true;
				}, 0);
			},
			//删除操作
			remove(id) {
				this.$Modal.confirm({
					title: '删除提示',
					content: '<p>移除后不可恢复，确定继续？</p>',
					onOk: () => {
						const th = this;
						axios.get(th.url + '/admin/deleteByPrimaryKey', {
							params: {
								id: id
							}
						}).then(function(res) {
							if (res.data.code === 200) {
								th.$Message.success(res.data.message);
								th.changePage(1);
							} else {
								th.$Message.error(res.data.message);
							}
						})
					}
				});
			},

			//导出数据
			exportData() {
				this.$refs.table.exportCsv({
					filename: '网点管理员信息'
				});
			},
			changePage(page) {
				const th = this;
				th.loading = true;
				if(!th.aPhones){
					th.aPhone = '';
				}
				if(!th.aNames){
					th.aName='';
				}
				axios.get(th.url + '/admin/selectPage', {
					params: {
						page: page,
						aPhone: th.aPhone,
						aName: th.aName,
						sSex: th.aSex
					}
				}).then(function(res) {
					th.data6 = res.data.data;
					th.count = res.data.count;
				})
				th.loading=false;
			},
		},
		created() {
			this.changePage(1);
		}
	}
</script>

<style>
	.ivu-table td, .ivu-table-border td{
		height: 41px;
	}
</style>
<template>
	<div>
		<div class="rigtop">
			<Form ref="customer" inline>
				<!-- <FormItem>
					<Row>
						<Col span="8" style="text-align: center;">
						<Checkbox label="姓名" v-model="cNames" >姓名</Checkbox>
						</Col>
						<Col span="16">
						<Input height="20" placeholder="模糊查询姓名" v-model="cName" ></Input>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="8" style="text-align: center;">
						<Checkbox label="手机号码" v-model="cPhones">手机号码</Checkbox>report
						</Col>
						<Col span="16">
						<Input height="20" placeholder="模糊查询手机号码"  v-model="cPhone"></Input>
						</Col>
					</Row>
				</FormItem> -->

				<!-- <FormItem style="position: relative;left: 10px">
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
			<Form ref="formValidate" :model="customer" :label-width="80">
				<FormItem label="姓名" prop="cName">
					<Input v-model="customer.cName" placeholder="请输入姓名"></Input>
				</FormItem>
				<FormItem label="单位" prop="cJob">
					<Input type="password" v-model="customer.cJob" :maxlength=16 placeholder="请输入单位"></Input>
				</FormItem>
				<FormItem label="地址" prop="cAddress">
					<Input v-model="customer.cAddress" :maxlength=6 placeholder="请输入地址"></Input>
				</FormItem>
				<FormItem label="电话" prop="cPhone">
				<Input v-model="customer.cPhone" :maxlength=6 placeholder="请输入电话"></Input>
				</FormItem>
				<FormItem label="对接业务员编号" prop="sId">
					<Input v-model="customer.sId"  placeholder="请输入对接业务员编号"></Input>
				</FormItem>
				<FormItem label="预存单号" prop="cBillnums">
					<Input v-model="customer.cBillnums" :maxlength=11 placeholder="请输入预存单号"></Input>
				</FormItem>
				<FormItem label="运费模板" prop="tId">
					<Input v-model="customer.tId"  placeholder="请输入运费模板"></Input>
				</FormItem>
				<FormItem label="月寄件量" prop="cSend">
					<Input v-model="customer.cSend"  placeholder="请输入月寄件量"></Input>
				</FormItem>
			</Form>
		</Modal>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				cPhones:false,
				cName:false,
				modal14: false,
				loading: true,
				modal14loading: true,
				title:'添加客户',
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
				customer: {
					cId: 0,
					cName: '',
					cJob: '',
					cAddress: '',
					cPhone: '',
					sId: 0,
					cBillnums: '',
					tId: '',
					cSend: ''
				},
				columns7: [{
						title: '编号',
						key: 'cId',
						align: 'center',
						width: 100
					},
					{
						title: '姓名',
						key: 'cName',
						align: 'center'
					},
					{
						title: '单位',
						key: 'cJob',
						align: 'center'
					},
					{
						title: '地址',
						key: 'cAddress',
						align: 'center'
					},
					{
						title: '电话号码',
						key: 'cPhone',
						align: 'center'
					},{
						title: '对接业务员编号',
						key: 'sId',
						align: 'center',
					},
					{
						title: '月寄件量',
						key: 'cSend',
						align: 'center'
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

											this.remove(params.row.cId)
										}
									}
								}, '移除')
							]);
						}
					}
				],
				data6: []
			}
		},
		methods: {
			//单击添加
			add() {
				this.title = "添加客户";
				this.customer.cName = "";
				this.customer.cJob = "";
				this.customer.cAddress = "";
				this.customer.cPhone = "";
				this.customer.sId = "";
				this.customer.cBillnums = "";
				this.customer.tId = "";
				this.customer.cSend = "";
				this.modal14 = true;
			},
			//单击编辑
			show(data){
				this.title = '编辑客户'
				this.modal14 = true;
				this.customer.cId = data.cId;
				this.customer.cName = data.cName;
				this.customer.cJob = data.cJob;
				this.customer.cAddress = data.cAddress;
				this.customer.cPhone = data.cPhone;
				this.customer.sId = data.sId;
				this.customer.cBillnums = data.cBillnums;
				this.customer.tId = data.tId;
				this.customer.cSend = data.cSend;
				this.modal14 = true;
			},
			//弹出添加保存
			addok() {
				if (this.customer.cName.length < 1) {
					this.$Message.warning('请输入名字!');
					this.modal14show();
					return;
				}
				if (this.customer.cPhone.length < 1 || this.customer.cPhone.length != 11) {
					this.$Message.warning('电话号码不正确，需要11位手机号码!');
					this.modal14show();
					return;
				}


				const th = this;
				var urls = "insert";
				if(this.title == "编辑客户"){
					urls = "updateByPrimaryKey";
				}
				axios.post(th.url + '/customer/'+urls, th.customer, {
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
			remove(id){
				this.$Modal.confirm({
					title: '删除提示',
					content: '<p>移除后不可恢复，确定继续？</p>',
					onOk: () => {
						const th = this;
						axios.get(th.url + '/customer/deleteByPrimaryKey', {
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
					filename: '客户信息'
				});
			},
			//查询
			changePage(page) {
				const th = this;
				th.loading = true;
				if(!th.cPhones){
					th.cPhone = '';
				}
				if(!th.cNames){
					th.cName='';
				}
				axios.get(th.url + '/customer/selectVague', {
					params: {
						page:page,
						cPhone: th.cPhone,
						cName: th.cName
					}
				}).then(function(res) {
					th.data6 = res.data.data;
					th.count = res.data.count;
				})
				th.loading = false;
			}
		},
		created() {
			this.changePage(1);
		}
	}
</script>

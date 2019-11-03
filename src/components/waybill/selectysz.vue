<style>
	.ivu-table td, .ivu-table-border td{
		height: 41px;
	}
</style>
<template>
	<div>
		<div class="rigtop">
			<Form ref="shipperInformation" inline>
				<!-- <FormItem>
					<Row>
						<Col span="8" style="text-align: center;">
						<Checkbox v-model="ddbhs" >订单编号</Checkbox>
						</Col>
						<Col span="16">
						<Input height="20" v-model="waybill.wId" placeholder="模糊查询订单编号"></Input>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="8" style="text-align: center;">
						<Checkbox v-model="lxhms">联系号码</Checkbox>
						</Col>
						<Col span="16">
						<Input height="20" v-model="waybill.wSphone" placeholder="模糊查询联系人手机号码"></Input>
						</Col>
					</Row>
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

	<Modal v-model="modal14" :loading="modal14loading" fullscreen  :title="title" @on-ok="addok">
			<Form ref="formValidate" :model="waybill" :label-width="80">
				<Row>
					<Col span="8">
					<FormItem label="订单编号" prop="wId">
						<Input v-model="waybill.wId" :maxlength=18 placeholder="自动录入"></Input>
					</FormItem>
					</Col>
					
					<Col span="8">
					<FormItem label="寄件人电话" prop="wSphone">
						<Input v-model="waybill.wSphone" :maxlength=18 placeholder="请输入寄件人电话"></Input>
					</FormItem>
					</Col>

					<Col span="8">
					<FormItem label="收件人电话" prop="wRphone">
						<Input v-model="waybill.wRphone" :maxlength=18 placeholder="请输入收件人电话"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="揽收业务员" prop="sInid">
						<Select v-model="waybill.sInid"  filterable>
								<Option v-for="item in staff" :value="item.sId" :key="item.sId">{{ item.sName }}</Option>
						</Select>
					</FormItem>
					</FormItem>
					</Col>
					
					<Col span="8">
					<FormItem label="签收业务员" prop="sOutid">
						<Select v-model="waybill.sOutid"  filterable>
								<Option v-for="item in staff" :value="item.sId" :key="item.sId">{{ item.sName }}</Option>
						</Select>
					</FormItem>
					</Col>

					<Col span="8">
					<FormItem label="揽收类型" prop="inType">
						<Input v-model="waybill.inType" placeholder="请输入揽收类型"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
						<Col span="8">
						<FormItem label="发货地址"  prop="wRaddress">
							<Input  v-model="waybill.wRaddress"  placeholder="请输入发货地址"></Input>
						</FormItem>
						</Col>
				</Row>
				<Row>
						<Col span="8">
						<FormItem label="收货地址" prop="wSaddress">
							<Input  v-model="waybill.wSaddress"  placeholder="请输入收货地址"></Input>
						</FormItem>
						</Col>
					
					
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="物流信息" prop="wInfo">
						<Input v-model="waybill.wInfo"  placeholder="请输入物流信息"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="客户" prop="cId">
						<Select v-model="waybill.cId"  filterable>
								<Option v-for="item in customer" :value="item.cId" :key="item.cId">{{ item.cName }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="内物类型" prop="wType">
						<Input v-model="waybill.wType"  placeholder="请输入内物类型"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="订单价格" prop="wPrice">
						<Input v-model="waybill.wPrice"  placeholder="请输入订单价格"></Input>
					</FormItem>
					</Col>
					
					<Col span="8">
					<FormItem label="订单重量" prop="wWeight">
						<Input v-model="waybill.wWeight"  placeholder="请输入订单重量"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="签收凭证" prop="wOutproof">
						<Input v-model="waybill.wOutproof"  placeholder="请输入签收凭证"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="收件人姓名" prop="wRname">
						<Input v-model="waybill.wSname"  placeholder="请输入收件人"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="收件人省份" prop="wRpro">
						<Input v-model="waybill.wRpro"  placeholder="请输入省份"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="收件人城市" prop="wRcity">
						<Input v-model="waybill.wRcity"  placeholder="请输入城市"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="收件人区县" prop="wRcouty">
						<Input v-model="waybill.wRcouty"  placeholder="请输入区县"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="寄件人省份" prop="wSpro">
						<Input v-model="waybill.wSpro"  placeholder="请输入省份"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="寄件人城市" prop="wScity">
						<Input v-model="waybill.wScity"  placeholder="请输入城市"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="寄件人区县" prop="wScouty">
						<Input v-model="waybill.wScouty"  placeholder="请输入区县"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="揽收时间">
						<DatePicker type="date" placeholder="揽收时间" @on-change="getStartTime" v-model="waybill.wIntime"></DatePicker>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="签收时间">
						<DatePicker type="date" placeholder="签收时间" @on-change="getStartTimeend" v-model="waybill.wOuttime"></DatePicker>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem label="状态">
						<RadioGroup v-model="waybill.wStatus">
							<Radio label="待运输">
								<Icon type="ios-eye" />
								<span>待运输</span>
							</Radio>
							<Radio label="运输中">
								<Icon type="ios-eye-off" />
								<span>运输中</span>
							</Radio>
							<Radio label="已运输">
								<Icon type="ios-football-outline" />
								<span>已运输</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<FormItem label="留言" prop="wNote">
						<Input v-model="waybill.wNote" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="留言"></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
		</Modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				modal14: false,
				loading: true,
				modal14loading: true,
				title:'添加订单',
				ddbhs:false,
				lxhms:false,
				url: "http://localhost:8080",
				count: 10,
				waybill:"",
				customer:"",
				staff:"",
				columns7: [{
						title: '运单编号',
						key: 'wId',
						align: 'center',
					},
					{
						title: '客户编号',
						key: 'cId',
						align: 'center',
					},
					{
						title: '寄件人手机',
						key: 'wSphone',
						align: 'center',
						tooltip: true
					},
					{
						title: '揽收时间',
						key: 'wIntime',
						align: 'center'
					},
					{
						title: '签收时间',
						key: 'wOuttime',
						align: 'center',
					}, {
						title: '资费',
						key: 'wPrice',
						tooltip: true,
						align: 'center'
					}, {
						title: '寄件地址',
						key: 'wSaddress',
						tooltip: true,
						align: 'center'
					}, {
						title: '收货地址',
						key: 'wRaddress',
						tooltip: true,
						align: 'center'
					}, {
						title: '派送业务员',
						key: 'sOutid',
						tooltip: true,
						align: 'center'
					}, {
						title: '揽收业务员',
						key: 'sInid',
						tooltip: true,
						align: 'center'
					}, {
						title: '运单状态',
						key: 'wStatus',
						tooltip: true,
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
										this.remove(params.row.oId)
										}
									}
								}, '移除')
							]);
						}
					}
				],
				data6: [],
				waybill:{
					wId:0,
					wStatus:"待运输",
					wInfo:"",
					cId:0,
					wNote:"",
					wWeight:0.0,
					wPrice:0.0,
					wType:"",
					sInid:0,
					wIntime:"",
					wIntype:"",
					wOutproof:"",
					wSname:"",
					wSpro:"",
					wScity:"",
					wScounty:"",
					wSphone:"",
					wRname:"",
					wRphone:"",
					wRpro:"",
					wRcity:"",
					wRcounty:"",
					wOuttime:"",
					wSaddress:"",
					wRaddress:"",
					sOutid:0,
				}
			}
		},
		methods: {
				//时间
			getStartTime(wIntime) {
				this.waybill.wIntime = wIntime;
			},
				//时间
			getStartTimeend(wOuttime) {
				this.waybill.wOutime = wOutime;
			},
			//单击添加
			add() {
				this.title = "添加订单";
				this.modal14 = true;
			},
			//弹出添加保存
			addok(){
				const th = this;
				var urls = "insert";
				if (this.title == "编辑订单") {
					urls = "updateByPrimaryKey";
				}
				axios.post(th.url + '/waybill/' + urls, th.waybill, {
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
			//单击编辑
			show(data){
				this.title = "编辑订单";
				this.waybill.wId=data.wId;
				this.waybill.wStatus=data.wStatus;
				this.waybill.wInfo=data.wInfo;
				this.waybill.cId=data.cId;
				this.waybill.wNote=data.wNote;
				this.waybill.wWeight=data.wWeight;
				this.waybill.wPrice=data.wPrice;
				this.waybill.wType=data.wType;
				this.waybill.sInid=data.sInid;
				this.waybill.wIntime=data.wIntime;
				this.waybill.wIntype=data.wIntype;
				this.waybill.wOutproof=data.wOutproof;
				this.waybill.wSname=data.wSname;
				this.waybill.wSpro=data.wSpro;
				this.waybill.wScity=data.wScity;
				this.waybill.wScounty=data.wScounty;
				this.waybill.wSphone=data.wSphone;
				this.waybill.wRname=data.wRname;
				this.waybill.wRphone=data.wRphone;
				this.waybill.wRpro=data.wRpro;
				this.waybill.wRcity=data.wRcity;
				this.waybill.wRcounty=data.wRcounty;
				this.waybill.wOuttime=data.wOuttime;
				this.waybill.wSaddress=data.wSaddress;
				this.waybill.wRaddress=data.wRaddress;
				this.waybill.sOutid=data.sOutid,
				this.modal14 = true;
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
						axios.get(th.url + '/waybill/deleteByPrimaryKey', {
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
					filename: '待运输信息表'
				});
			},
			//查询
			changePage(page) {
				const th = this;
				if(!th.ddbhs){
					th.waybill.oId = '';
				}
				if(!th.lxhms){
					th.waybill.contacts = '';
				}
				axios.get(th.url + '/waybill/selectStart', {
					params: {
						page: page,
						wId:th.waybill.wId,
						wStatus:'运输中',
						wSphone:th.waybill.wSphone
					}
				}).then(function(res) {
					th.data6 = res.data.data;
					th.count = res.data.count;
				})
				th.loading = false;
			},
		},
		created() {
			var th = this;
			axios.get(th.url + '/shipperInformation/selectAll').then(function(res) {
				th.shipperInformation = res.data.data;
			})
			axios.get(th.url + '/vehicleType/selectGroup').then(function(res) {
				th.vehicleType = res.data.data;
			})
			axios.get(th.url + '/vehicle/selectAll').then(function(res) {
				th.vehicle = res.data.data;
			})
			this.changePage(1);
		}
	}
</script>

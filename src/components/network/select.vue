<style>
	.ivu-table td, .ivu-table-border td{
		height: 41px;
	}
</style>
<template>
	<div>
		<div class="rigtop">
			<Form ref="network" inline>
				<FormItem style="position: absolute;right: 30px">
						<Button @click="add()">
							<Icon type="ios-add-circle-outline" />添加记录
						</Button>
					</FormItem>
					<FormItem>
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
			<Form ref="formValidate" :model="network" :label-width="80">
				<FormItem label="省份" prop="nProvince">
					<Input v-model="network.nProvince" :maxlength=20 placeholder="请输入省份"></Input>
				</FormItem>
				<FormItem label="城市" prop="nCity">
					<Input type="password" v-model="network.nCity" :maxlength=20 placeholder="请输入城市"></Input>
				</FormItem>
				<FormItem label="区县" prop="nCounty">
					<Input v-model="network.nCounty" :maxlength=20 placeholder="请输入区县"></Input>
				</FormItem>
				<FormItem label="详细地址" prop="nAddress">
              <Input v-model="network.nAddress" :maxlength=50 placeholder="请输入详细地址"></Input>
				</FormItem>
				<FormItem label="月揽收量" prop="nIn">
					<Input v-model="network.nIn"  placeholder="请输入月揽收量"></Input>
				</FormItem>
				<FormItem label="月派件量" prop="nOut">
					<Input v-model="network.nOut"  placeholder="请输入月派件量"></Input>
				</FormItem>
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
				title:'添加网点',

				url: "http://localhost:8080",
				count: 10,
				network: {
					nId: 0,
					nProvince: '',
					nCity: '',
					nCounty: '',
					nAddress: '',
					nIn: 0,
					nOut: 0
				},
				columns7: [{
						title: '编号',
						key: 'nId',
						align: 'center',
						width: 100
					},
					{
						title: '省份',
						key: 'nProvince',
						align: 'center'
					},
					{
						title: '城市',
						key: 'nCity',
						align: 'center'
					},
					{
						title: '区县',
						key: 'nCounty',
						align: 'center'
					},
					{
						title: '详细地址',
						key: 'nAddress',
						align: 'center'
					},{
						title: '月揽收量',
						key: 'nIn',
						align: 'center'
					},
					{
						title: '月派件量',
						key: 'nOut',
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

											this.remove(params.row.nId)
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
				this.title = "添加网点";
				this.network.nProvince = "";
				this.network.nCity = "";
				this.network.nCounty = "";
				this.network.nIn = "";
				this.network.nAddress= "",
				this.network.nOut = "";
				this.modal14 = true;
			},
			//单击编辑
			show(data){
				this.title = '编辑网点'
				this.modal14 = true;
				this.network.nId = data.nId;
				this.network.nProvince= data.nProvince;
				this.network.nCity= data.nCity;
				this.network.nCounty= data.nCounty;
				this.network.nIn = data.nIn;
				this.network.nAddress = data.nAddress;
				this.network.nOut= data.nOut;
				this.modal14 = true;
			},
			//弹出添加保存
			addok() {
				if (this.network.nAddress.length < 1) {
					this.$Message.warning('请输入详细地址!');
					this.modal14show();
					return;
				}

				const th = this;
				var urls = "insert";
				if(this.title == "编辑网点"){
					urls = "updateByPrimaryKey";
				}
				axios.post(th.url + '/network/'+urls, th.network, {
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
						axios.get(th.url + '/network/deleteByPrimaryKey', {
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
					filename: '网点信息'
				});
			},
				//查询
			changePage(page) {
				const th = this;
				console.log(th.url);
				axios.get(th.url + '/network/selectPage', {
					params: {
						page: page
					}
				}).then(function(res) {
					th.data6 = res.data.data;
					th.count = res.data.count;
				})
				th.loading = false;
			},
		},
		created() {
			this.changePage(1);
		}
	}
</script>

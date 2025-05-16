import React, { Component } from 'react';
import axios from 'axios';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: 1, // 기본값 설정
            contracts: [],
            loading: false,
            error: null
        };
    }

    handleMemberIdChange = (e) => {
        this.setState({ memberId: e.target.value });
    }

    fetchContracts = async () => {
        const { memberId } = this.state;
        
        this.setState({ loading: true, error: null });
        
        try {
            const response = await axios.get(
                `https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contract`,
                {
                    params: {
                        memberId: memberId
                    }
                }
            );
            
            this.setState({ 
                contracts: response.data, 
                loading: false 
            });
        } catch (error) {
            console.error("계약 데이터 가져오기 실패:", error);
            this.setState({ 
                error: `데이터 로드 실패: ${error.message}`, 
                loading: false 
            });
        }
    }

    render() {
        const { memberId, contracts, loading, error } = this.state;

        return (
            <div style={{ padding: '20px' }}>
                <h2>계약서 이미지 조회</h2>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>회원 ID:</label>
                    <input 
                        type="number" 
                        value={memberId} 
                        onChange={this.handleMemberIdChange} 
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <button 
                        onClick={this.fetchContracts}
                        disabled={loading}
                        style={{ 
                            padding: '5px 10px', 
                            backgroundColor: '#4CAF50', 
                            color: 'white', 
                            border: 'none', 
                            cursor: 'pointer' 
                        }}
                    >
                        {loading ? '로딩 중...' : '조회하기'}
                    </button>
                </div>
                
                {error && (
                    <div style={{ color: 'red', marginBottom: '20px' }}>
                        {error}
                    </div>
                )}
                
                {loading && <p>로딩 중...</p>}
                
                {contracts.length > 0 ? (
                    <div>
                        {contracts.map(contract => (
                            <div key={contract.contractId} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
                                <h3>계약서 ID: {contract.contractId}</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                    <div>
                                        <h4>원본 이미지</h4>
                                        {contract.originalImageUrl ? (
                                            <img 
                                                src={contract.originalImageUrl} 
                                                alt="원본 계약서" 
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        ) : (
                                            <p>이미지가 없습니다</p>
                                        )}
                                    </div>
                                    <div>
                                        <h4>번역된 이미지</h4>
                                        {contract.translatedImageUrl ? (
                                            <img 
                                                src={contract.translatedImageUrl} 
                                                alt="번역된 계약서" 
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        ) : (
                                            <p>번역된 이미지가 없습니다</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !loading && (
                    <p>조회된 계약서가 없습니다. 조회하기 버튼을 클릭하여 데이터를 불러오세요.</p>
                )}
            </div>
        );
    }
}

export default Contract;
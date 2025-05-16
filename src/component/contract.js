import React, { Component } from 'react';
import axios from 'axios';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: 1, // 기본값 설정
            contracts: [],
            loading: false,
            error: null,
            showModal: false,
            selectedContract: null,
            detailLoading: false,
            detailError: null,
            legalAnalysis: null,
            analysisLoading: false,
            analysisError: null
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

    // 계약서 상세 정보 가져오기
    fetchContractDetail = async (contractId) => {
        this.setState({ detailLoading: true, detailError: null });
        
        try {
            const response = await axios.get(
                `https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contract/${contractId}`
            );
            
            this.setState({ 
                selectedContract: response.data, 
                detailLoading: false,
                showModal: true
            });
        } catch (error) {
            console.error("계약서 상세 정보 가져오기 실패:", error);
            this.setState({ 
                detailError: `상세 정보 로드 실패: ${error.message}`, 
                detailLoading: false,
                showModal: true // 에러 메시지를 모달에 표시하기 위해 모달은 열어줌
            });
        }
    }

    // 법률 정보 분석 요청 - 여기를 contracts로 수정
    analyzeLegalInfo = async (contractId) => {
        this.setState({ analysisLoading: true, analysisError: null, legalAnalysis: null });
        
        try {
            const response = await axios.post(
                `https://port-0-mobicom-sw-contest-2025-umnqdut2blqqevwyb.sel4.cloudtype.app/api/contracts/${contractId}/analyze`
            );
            
            this.setState({ 
                legalAnalysis: response.data, 
                analysisLoading: false
            });
        } catch (error) {
            console.error("법률 정보 분석 실패:", error);
            this.setState({ 
                analysisError: `법률 정보 분석 실패: ${error.message} (${error.response?.status || '알 수 없는 오류'})`, 
                analysisLoading: false
            });
        }
    }

    // 모달 열기
    openModal = (contract) => {
        // 이미 기본 정보가 있으면 먼저 표시
        this.setState({ 
            selectedContract: contract, 
            showModal: true,
            legalAnalysis: null, // 새 계약서를 볼 때 이전 분석 결과 초기화
            analysisError: null
        });
        
        // 상세 정보 API 호출
        this.fetchContractDetail(contract.contractId);
    }

    // 모달 닫기
    closeModal = () => {
        this.setState({ 
            showModal: false, 
            selectedContract: null,
            detailError: null,
            legalAnalysis: null,
            analysisError: null
        });
    }

    render() {
        const { 
            memberId, 
            contracts, 
            loading, 
            error, 
            showModal, 
            selectedContract, 
            detailLoading, 
            detailError,
            legalAnalysis,
            analysisLoading,
            analysisError
        } = this.state;

        // 모달 스타일
        const modalStyle = {
            display: showModal ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            overflow: 'auto'
        };

        const modalContentStyle = {
            backgroundColor: 'white',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #888',
            width: '80%',
            maxWidth: '900px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxHeight: '80vh',
            overflow: 'auto'
        };

        const closeButtonStyle = {
            color: '#aaa',
            float: 'right',
            fontSize: '28px',
            fontWeight: 'bold',
            cursor: 'pointer'
        };

        const tabStyle = {
            overflow: 'hidden',
            borderBottom: '1px solid #ccc',
            marginBottom: '20px'
        };

        const tabButtonStyle = (isActive) => ({
            background: isActive ? '#f1f1f1' : 'inherit',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: '10px 16px',
            fontSize: '16px',
            borderBottom: isActive ? '2px solid #2196F3' : 'none',
            fontWeight: isActive ? 'bold' : 'normal'
        });

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
                                                style={{ 
                                                    maxWidth: '100%', 
                                                    height: 'auto',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.openModal(contract)}
                                                title="클릭하여 상세 정보 보기"
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
                                                style={{ 
                                                    maxWidth: '100%', 
                                                    height: 'auto',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.openModal(contract)}
                                                title="클릭하여 상세 정보 보기"
                                            />
                                        ) : (
                                            <p>번역된 이미지가 없습니다</p>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => this.openModal(contract)}
                                    style={{ 
                                        marginTop: '10px',
                                        padding: '5px 10px', 
                                        backgroundColor: '#2196F3', 
                                        color: 'white', 
                                        border: 'none', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    상세 정보 보기
                                </button>
                            </div>
                        ))}
                    </div>
                ) : !loading && (
                    <p>조회된 계약서가 없습니다. 조회하기 버튼을 클릭하여 데이터를 불러오세요.</p>
                )}

                {/* 모달 */}
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <span 
                            style={closeButtonStyle} 
                            onClick={this.closeModal}
                        >
                            &times;
                        </span>
                        
                        <h2>계약서 상세 정보</h2>
                        
                        {detailLoading && <p>상세 정보 로딩 중...</p>}
                        
                        {detailError && (
                            <div style={{ color: 'red', marginBottom: '15px' }}>
                                {detailError}
                            </div>
                        )}
                        
                        {selectedContract && (
                            <div>
                                <p><strong>계약서 ID:</strong> {selectedContract.contractId}</p>
                                <p><strong>회원 ID:</strong> {selectedContract.memberId}</p>
                                
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                                    <div style={{ flex: 1, minWidth: '300px' }}>
                                        <h3>원본 이미지</h3>
                                        {selectedContract.originalImageUrl ? (
                                            <img 
                                                src={selectedContract.originalImageUrl} 
                                                alt="원본 계약서" 
                                                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <p>원본 이미지가 없습니다</p>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: '300px' }}>
                                        <h3>번역된 이미지</h3>
                                        {selectedContract.translatedImageUrl ? (
                                            <img 
                                                src={selectedContract.translatedImageUrl} 
                                                alt="번역된 계약서" 
                                                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <p>번역된 이미지가 없습니다</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* 법률 정보 분석 섹션 */}
                                <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                                    <h3>법률 정보 분석</h3>
                                    
                                    {!legalAnalysis && !analysisLoading && !analysisError && (
                                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                            <button 
                                                onClick={() => this.analyzeLegalInfo(selectedContract.contractId)}
                                                style={{ 
                                                    padding: '8px 15px', 
                                                    backgroundColor: '#4CAF50', 
                                                    color: 'white', 
                                                    border: 'none', 
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    fontSize: '16px'
                                                }}
                                            >
                                                법률 정보 분석하기
                                            </button>
                                        </div>
                                    )}
                                    
                                    {analysisLoading && (
                                        <p style={{ textAlign: 'center' }}>법률 정보 분석 중...</p>
                                    )}
                                    
                                    {analysisError && (
                                        <div style={{ color: 'red', margin: '15px 0' }}>
                                            <p>{analysisError}</p>
                                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                                <button 
                                                    onClick={() => this.analyzeLegalInfo(selectedContract.contractId)}
                                                    style={{ 
                                                        padding: '5px 10px', 
                                                        backgroundColor: '#FF9800', 
                                                        color: 'white', 
                                                        border: 'none', 
                                                        cursor: 'pointer',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    다시 시도
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {legalAnalysis && (
                                        <div>
                                            {/* 탭 메뉴 */}
                                            <div style={tabStyle}>
                                                <button 
                                                    id="issuesTab" 
                                                    style={tabButtonStyle(true)} 
                                                    onClick={() => {
                                                        document.getElementById('issues').style.display = 'block';
                                                        document.getElementById('laws').style.display = 'none';
                                                        document.getElementById('issuesTab').style.fontWeight = 'bold';
                                                        document.getElementById('lawsTab').style.fontWeight = 'normal';
                                                    }}
                                                >
                                                    검토 사항
                                                </button>
                                                <button 
                                                    id="lawsTab" 
                                                    style={tabButtonStyle(false)} 
                                                    onClick={() => {
                                                        document.getElementById('issues').style.display = 'none';
                                                        document.getElementById('laws').style.display = 'block';
                                                        document.getElementById('issuesTab').style.fontWeight = 'normal';
                                                        document.getElementById('lawsTab').style.fontWeight = 'bold';
                                                    }}
                                                >
                                                    관련 법률
                                                </button>
                                            </div>
                                            
                                            {/* 검토 사항 내용 */}
                                            <div id="issues" style={{ display: 'block' }}>
                                                <h4>계약서 검토 사항</h4>
                                                {legalAnalysis.issues && legalAnalysis.issues.length > 0 ? (
                                                    <div>
                                                        {legalAnalysis.issues.map((issue, index) => (
                                                            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
                                                                <h5 style={{ color: '#D32F2F', marginTop: 0 }}>검토 유형: {issue.type}</h5>
                                                                <p><strong>사유:</strong> {issue.reason}</p>
                                                                <p><strong>근거:</strong> {issue.evidence}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p>검토 사항이 없습니다.</p>
                                                )}
                                            </div>
                                            
                                            {/* 관련 법률 내용 */}
                                            <div id="laws" style={{ display: 'none' }}>
                                                <h4>관련 법률 정보</h4>
                                                {legalAnalysis.laws && legalAnalysis.laws.length > 0 ? (
                                                    <div>
                                                        {legalAnalysis.laws.map((law, index) => (
                                                            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
                                                                <h5 style={{ color: '#1976D2', marginTop: 0 }}>법률명: {law.lawName}</h5>
                                                                {law.translatedLawName && (
                                                                    <p><strong>번역된 법률명:</strong> {law.translatedLawName}</p>
                                                                )}
                                                                {law.translatedSummary && (
                                                                    <p><strong>요약:</strong> {law.translatedSummary}</p>
                                                                )}
                                                                {law.referenceNumber && (
                                                                    <p><strong>참조 번호:</strong> {law.referenceNumber}</p>
                                                                )}
                                                                {law.sourceLink && (
                                                                    <p>
                                                                        <strong>출처:</strong> 
                                                                        <a 
                                                                            href={law.sourceLink} 
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer"
                                                                            style={{ color: '#1976D2', textDecoration: 'none' }}
                                                                        >
                                                                            {law.sourceLink}
                                                                        </a>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p>관련 법률 정보가 없습니다.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button 
                                onClick={this.closeModal}
                                style={{ 
                                    padding: '8px 15px', 
                                    backgroundColor: '#f44336', 
                                    color: 'white', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contract;